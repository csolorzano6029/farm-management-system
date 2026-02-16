import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { WorkerService } from '../../services/worker.service';
import { WorkerModel } from '../../models/worker.model';

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    PaginatorModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './workers.html',
  styleUrls: ['./workers.css'],
})
export class Workers implements OnInit {
  workers = signal<WorkerModel[]>([]);
  totalRecords = signal(0);
  loading = signal(true);
  rows = signal(10);
  page = signal(1);

  // Dialog State
  workerDialog = signal(false);

  // Form
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  workerForm = this.fb.group({
    id: [null as string | null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  isEditMode = signal(false);

  constructor(private readonly workerService: WorkerService) {}

  ngOnInit() {
    this.loadWorkers(1, 10);
  }

  loadWorkers(page: number, limit: number) {
    this.loading.set(true);
    this.workerService.findAllPaged(page, limit).subscribe({
      next: (response) => {
        this.workers.set(response.data);
        this.totalRecords.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading workers', err);
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los trabajadores',
        });
      },
    });
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    const limit = event.rows;
    this.page.set(page);
    this.rows.set(limit);
    this.loadWorkers(page, limit);
  }

  getSeverity(active: boolean): 'success' | 'danger' {
    return active ? 'success' : 'danger';
  }

  // Actions
  openNew() {
    this.workerForm.reset();
    this.isEditMode.set(false);
    this.workerDialog.set(true);
  }

  editWorker(worker: WorkerModel) {
    this.workerForm.patchValue({
      id: worker.id,
      firstName: worker.firstName,
      lastName: worker.lastName,
    });
    this.isEditMode.set(true);
    this.workerDialog.set(true);
  }

  toggleStatus(worker: WorkerModel) {
    const newStatus = !worker.active;
    const action = newStatus ? 'activar' : 'inactivar';

    this.confirmationService.confirm({
      message: `¿Estás seguro de ${action} a ${worker.firstName} ${worker.lastName}?`,
      header: `Confirmar ${newStatus ? 'Activación' : 'Desactivación'}`,
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-success confirm-yes-btn',
      rejectButtonStyleClass: 'p-button-warning confirm-no-btn',
      acceptLabel: `Sí, ${action}`,
      rejectLabel: 'Cancelar',
      accept: () => {
        this.workerService.update(worker.id, { active: newStatus }).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: `Trabajador ${newStatus ? 'activado' : 'inactivado'}`,
              life: 3000,
            });
            this.loadWorkers(this.page(), this.rows());
          },
          error: (err) => {
            console.error('Error updating worker status', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `No se pudo ${action} el trabajador`,
              life: 3000,
            });
          },
        });
      },
    });
  }

  hideDialog() {
    this.workerDialog.set(false);
  }

  saveWorker() {
    if (this.workerForm.invalid) {
      this.workerForm.markAllAsTouched();
      return;
    }

    const formValue = this.workerForm.value;
    const workerData = {
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
    };

    if (this.isEditMode() && formValue.id) {
      this.workerService.update(formValue.id, workerData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Trabajador actualizado',
          });
          this.loadWorkers(this.page(), this.rows());
          this.hideDialog();
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar',
          }),
      });
    } else {
      this.workerService.create(workerData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Trabajador creado',
          });
          this.loadWorkers(this.page(), this.rows());
          this.hideDialog();
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear',
          }),
      });
    }
  }
}
