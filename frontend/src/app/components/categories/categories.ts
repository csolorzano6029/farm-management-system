import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogueType, CatalogueValue } from '../../models/catalogue.model';
import { CatalogueService } from '../../services/catalogue.service';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    TextareaModule,
    ConfirmDialogModule,
    PaginatorModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly catalogueService = inject(CatalogueService);
  private readonly confirmationService = inject(ConfirmationService);

  types = signal<CatalogueType[]>([]);
  selectedType = signal<CatalogueType | null>(null);
  values = signal<CatalogueValue[]>([]);

  // Pagination State
  page = signal(1);
  limit = signal(10);
  total = signal(0);

  loadingTypes = signal(true);
  loadingValues = signal(false);
  error = signal<string | null>(null);

  // Form State
  showModal = signal(false);
  editingValue = signal<CatalogueValue | null>(null);
  formName = signal('');
  formCode = signal('');
  formDesc = signal('');
  formNumeric = signal<number | null>(null);

  ngOnInit() {
    this.loadTypes();
  }

  loadTypes() {
    this.loadingTypes.set(true);
    this.catalogueService.findAllTypes().subscribe({
      next: (data) => {
        this.types.set(data);
        this.loadingTypes.set(false);
        if (data.length > 0) {
          this.selectType(data[0]);
        }
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error al cargar tipos de catálogo');
        this.loadingTypes.set(false);
      },
    });
  }

  selectType(type: CatalogueType) {
    this.selectedType.set(type);
    this.loadValues(type.code);
  }

  loadValues(code: string) {
    this.loadingValues.set(true);
    this.catalogueService.findValuesByTypePaginated(code, this.page(), this.limit()).subscribe({
      next: (response) => {
        this.values.set(response.data);
        this.total.set(response.total);
        this.loadingValues.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loadingValues.set(false);
      },
    });
  }

  onPageChange(event: any) {
    this.page.set(event.page + 1); // PrimeNG is 0-indexed
    this.limit.set(event.rows);
    const type = this.selectedType();
    if (type) {
      this.loadValues(type.code);
    }
  }

  openCreateModal() {
    this.editingValue.set(null);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(value: CatalogueValue) {
    this.editingValue.set(value);
    this.formName.set(value.name);
    this.formCode.set(value.code);
    this.formDesc.set(value.description || '');
    this.formNumeric.set(value.numericValue ?? null);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm() {
    this.formName.set('');
    this.formCode.set('');
    this.formDesc.set('');
    this.formNumeric.set(null);
  }

  saveValue() {
    const type = this.selectedType();
    if (!type) return;

    // Simple validation
    if (!this.formName() || !this.formCode()) {
      alert('Nombre y Código son requeridos');
      return;
    }

    const payload: any = {
      name: this.formName(),
      code: this.formCode(),
      description: this.formDesc(),
      numericValue: this.formNumeric() ?? undefined,
      catalogueTypeId: type.id,
    };

    if (this.editingValue()) {
      // Update
      this.catalogueService.updateValue(this.editingValue()!.id!, payload).subscribe({
        next: () => {
          this.closeModal();
          this.loadValues(type.code);
        },
        error: (err) => alert('Error al actualizar'),
      });
    } else {
      // Create
      this.catalogueService.createValue(payload).subscribe({
        next: () => {
          this.closeModal();
          this.loadValues(type.code);
        },
        error: (err) => alert('Error al crear'),
      });
    }
  }

  deleteValue(value: CatalogueValue) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar "${value.name}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptLabel: 'Sí, Eliminar',
      rejectLabel: 'No, Cancelar',
      acceptButtonStyleClass: 'p-button-success confirm-yes-btn',
      rejectButtonStyleClass: 'p-button-danger confirm-no-btn',
      accept: () => {
        this.catalogueService.removeValue(value.id!).subscribe({
          next: () => {
            this.loadValues(this.selectedType()!.code);
          },
          error: (err) => alert('Error al eliminar'),
        });
      },
    });
  }
}
