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
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {

  private service = inject(ProductService);
  private dialog = inject(MatDialog);

  displayedColumns = ['name', 'sku', 'stock', 'salePrice', 'actions'];
  data: Product[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe({
      next: (resp) => this.data = resp,
    });
  }

  openCreate() {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  openEdit(product: Product) {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar producto?')) return;

    this.service.delete(id).subscribe({
      next: () => this.loadData()
    });
  }
}
