import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './product-form.html'
})
export class ProductForm {

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef<ProductForm>);

  categories: any[] = [];

 form = new FormGroup({
  name: new FormControl<string>('', { nonNullable: true }),
  sku: new FormControl<string>('', { nonNullable: true }),
  stock: new FormControl<number>(0, { nonNullable: true }),
  costPrice: new FormControl<number>(0, { nonNullable: true }),
  salePrice: new FormControl<number>(0, { nonNullable: true }),
  categoryId: new FormControl<number>(0, { nonNullable: true }),
  active: new FormControl<boolean>(true, { nonNullable: true }),
});


  constructor(@Inject(MAT_DIALOG_DATA) public data: Product | null) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(resp => this.categories = resp);

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }
cancel() {
  this.dialogRef.close();
}

  save() {
    const value = this.form.value as Product;

    const request =
      this.data ?
        this.productService.update(this.data.id!, value) :
        this.productService.create(value);

    request.subscribe(() => this.dialogRef.close(true));
  }
}
