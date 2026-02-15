import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TransactionService } from '../../services/transaction.service';
import { CatalogueService } from '../../services/catalogue.service';
import { Transaction, CreateTransactionDto } from '../../models/transaction.model';
import { CatalogueValue } from '../../models/catalogue.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    SelectButtonModule,
    TextareaModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  private readonly transactionService = inject(TransactionService);
  private readonly catalogueService = inject(CatalogueService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  transactions = signal<Transaction[]>([]);
  total = signal(0);
  page = signal(1);
  limit = signal(5);
  loading = signal(true);
  error = signal<string | null>(null);

  // Dialog & Form
  transactionDialog = signal(false);
  submitted = signal(false);
  transactionForm: FormGroup;
  isEditMode = signal(false);
  currentTransactionId = signal<string | null>(null);

  categories = signal<CatalogueValue[]>([]);
  transactionTypes = [
    { label: 'Ingreso', value: 'INGRESO' },
    { label: 'Gasto', value: 'GASTO' },
  ];

  constructor() {
    this.transactionForm = this.fb.group({
      type: ['INGRESO', Validators.required],
      date: [new Date(), Validators.required],
      categoryId: [null, Validators.required],
      quantity: [null], // Optional
      totalAmount: [null, [Validators.required, Validators.min(0.01)]],
      notes: [''],
    });

    // Listen to type changes to reload categories
    this.transactionForm.get('type')?.valueChanges.subscribe((type) => {
      if (type) {
        this.loadCategories(type);
        // Only reset category if not in edit mode or if the type actually changed by user interaction
        // For simplicity, we might reset, but in edit mode we handle it differently
        if (!this.isEditMode()) {
          this.transactionForm.patchValue({ categoryId: null }, { emitEvent: false });
        }
      }
    });
  }

  ngOnInit() {
    this.loadTransactions();
  }

  loadCategories(type: string) {
    if (!type) return;

    // Determine the catalogue code based on the transaction type
    const catalogueCode = type;

    this.catalogueService.findValuesByType(catalogueCode).subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => {
        console.error(`Error loading categories for ${catalogueCode}`, err);
        this.categories.set([]); // Clear on error
      },
    });
  }

  loadTransactions() {
    this.loading.set(true);
    this.transactionService.findAllPaged(this.page(), this.limit()).subscribe({
      next: (response) => {
        this.transactions.set(response.data);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error al cargar las transacciones');
        this.loading.set(false);
      },
    });
  }

  onPageChange(event: any) {
    this.page.set(event.page + 1); // PrimeNG is 0-indexed
    this.limit.set(event.rows);
    this.loadTransactions();
  }

  openNew() {
    this.isEditMode.set(false);
    this.currentTransactionId.set(null);
    this.transactionForm.reset({
      type: 'INGRESO',
      date: new Date(),
      categoryId: null,
      quantity: null,
      totalAmount: null,
      notes: '',
    });
    this.submitted.set(false);
    this.transactionDialog.set(true);
    // Trigger category load
    this.loadCategories('INGRESO');
  }

  editTransaction(transaction: Transaction) {
    this.isEditMode.set(true);
    this.currentTransactionId.set(transaction.id);

    // Load categories for the transaction type first
    this.loadCategories(transaction.type);

    this.transactionForm.patchValue({
      type: transaction.type,
      date: new Date(transaction.date), // Ensure Date object
      categoryId: transaction.category?.id || transaction.categoryId,
      quantity: transaction.quantity,
      totalAmount: transaction.totalAmount,
      notes: transaction.notes,
    });

    this.transactionDialog.set(true);
  }

  deleteTransaction(transaction: Transaction) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta transacción?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-circle', // Changed icon
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptLabel: 'Sí, Eliminar',
      rejectLabel: 'No, Cancelar',
      acceptButtonStyleClass: 'p-button-success confirm-yes-btn', // Green
      rejectButtonStyleClass: 'p-button-danger confirm-no-btn', // Red
      accept: () => {
        this.loading.set(true);
        this.transactionService.delete(transaction.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Transacción eliminada',
              life: 3000,
            });
            this.loadTransactions();
            this.loading.set(false);
          },
          error: (err) => {
            console.error('Error deleting transaction', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la transacción',
              life: 3000,
            });
            this.loading.set(false);
          },
        });
      },
    });
  }

  hideDialog() {
    this.transactionDialog.set(false);
    this.submitted.set(false);
  }

  saveTransaction() {
    this.submitted.set(true);

    if (this.transactionForm.invalid) {
      return;
    }

    const formValue = this.transactionForm.value;

    const transactionData: CreateTransactionDto = {
      ...formValue,
      date: formValue.date.toISOString(), // Ensure ISO string for backend
    };

    this.loading.set(true);

    if (this.isEditMode() && this.currentTransactionId()) {
      this.transactionService.update(this.currentTransactionId()!, transactionData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Transacción actualizada',
            life: 3000,
          });
          this.hideDialog();
          this.loadTransactions();
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error updating transaction', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la transacción',
            life: 3000,
          });
          this.loading.set(false);
        },
      });
    } else {
      this.transactionService.create(transactionData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Transacción creada',
            life: 3000,
          });
          this.hideDialog();
          this.loadTransactions();
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error creating transaction', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear la transacción',
            life: 3000,
          });
          this.loading.set(false);
        },
      });
    }
  }
}
