import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductForm } from './product-form';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'product-list',
  standalone: true,
  templateUrl: './product-list.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class ProductList implements OnInit {

  // Servicios
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  // Tabla
  displayedColumns = [
    'name', 'sku', 'stock', 'costPrice', 'salePrice', 'category', 'actions'
  ];

  // Datos
  products: Product[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  // CARGA DE PRODUCTOS (único método)
  loadProducts() {
    this.productService.getAll().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  // CREAR PRODUCTO
  openCreate() {
    this.dialog.open(ProductForm, {
      width: '400px',
      data: null
    }).afterClosed().subscribe(done => {
      if (done) this.loadProducts();
    });
  }

  // EDITAR PRODUCTO
  openEdit(product: Product) {
    this.dialog.open(ProductForm, {
      width: '400px',
      data: product
    }).afterClosed().subscribe(done => {
      if (done) this.loadProducts();
    });
  }

  // AJUSTAR STOCK
  adjust(product: Product) {
    import('./product-adjust').then(m => {
      this.dialog.open(m.ProductAdjust, {
        width: '420px',
        data: product
      }).afterClosed().subscribe(done => {
        if (done) this.loadProducts(); // ✔ unificado
      });
    });
  }

  // ELIMINAR PRODUCTO
  delete(id: number) {
    if (!confirm('¿Eliminar producto?')) return;

    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }
}

