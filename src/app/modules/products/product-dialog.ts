import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar Producto' : 'Nuevo Producto' }}</h2>

    <form [formGroup]="form" class="form">

      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="name">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>SKU</mat-label>
        <input matInput formControlName="sku">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Stock</mat-label>
        <input matInput type="number" formControlName="stock">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Precio Costo</mat-label>
        <input matInput type="number" formControlName="costPrice">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Precio Venta</mat-label>
        <input matInput type="number" formControlName="salePrice">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Categoría</mat-label>
        <mat-select formControlName="categoryId">
          <mat-option *ngFor="let c of categories" [value]="c.id">
            {{ c.name }}
          </mat-option>
        </mat-select>
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
export class ProductDialog {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialogRef<ProductDialog>);
  private service = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories: Category[] = [];

  form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    sku: ['', Validators.required],
    stock: [0, Validators.required],
    costPrice: [0, Validators.required],
    salePrice: [0, Validators.required],
    categoryId: [0, Validators.required],
    active: [true]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product | null) {
    if (data) this.form.patchValue(data);

    this.categoryService.getAll().subscribe(res => this.categories = res);
  }

  save() {
    const value = this.form.value as Product;

    if (value.id && value.id > 0) {
      this.service.update(value.id, value).subscribe(() => this.dialog.close(true));
    } else {
      this.service.create(value).subscribe(() => this.dialog.close(true));
    }
  }

  close() {
    this.dialog.close(false);
  }
}
