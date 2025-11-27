import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar Categoría' : 'Nueva Categoría' }}</h2>

    <form [formGroup]="form" class="form">

      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="name">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Descripción</mat-label>
        <input matInput formControlName="description">
      </mat-form-field>

      <mat-slide-toggle formControlName="active">Activo</mat-slide-toggle>

      <div class="actions">
        <button mat-button (click)="close()">Cancelar</button>
        <button mat-raised-button color="primary" (click)="save()">Guardar</button>
      </div>

    </form>
  `,
  styles: [`
    .form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 10px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 15px;
    }
  `]
})
export class CategoryDialog {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialogRef<CategoryDialog>);
  private service = inject(CategoryService);

  form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    active: [true]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Category | null) {
    if (data) this.form.patchValue(data);
  }

  save() {
    const value = this.form.value as Category;

    // Si hay endpoint PUT lo colocamos acá:
    this.dialog.close(true);
  }

  close() { this.dialog.close(false); }
}
