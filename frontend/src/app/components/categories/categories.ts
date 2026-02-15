import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogueService } from '../../services/catalogue.service';
import { CatalogueType, CatalogueValue } from '../../models/catalogue.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly catalogueService = inject(CatalogueService);

  types = signal<CatalogueType[]>([]);
  selectedType = signal<CatalogueType | null>(null);
  values = signal<CatalogueValue[]>([]);

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
    this.catalogueService.findValuesByType(code).subscribe({
      next: (data) => {
        this.values.set(data);
        this.loadingValues.set(false);
      },
      error: (err) => {
        console.error(err);
        // Don't set global error, just maybe empty list or snackbar
        this.loadingValues.set(false);
      },
    });
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
    if (!confirm(`¿Estás seguro de eliminar "${value.name}"?`)) return;

    this.catalogueService.removeValue(value.id!).subscribe({
      next: () => {
        this.loadValues(this.selectedType()!.code);
      },
      error: (err) => alert('Error al eliminar'),
    });
  }
}
