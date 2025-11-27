import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { StockMovementService } from '../../core/services/stock-movement.service';
import { ProductService } from '../../core/services/product.service';

import { StockMovement } from '../../core/models/stock-movement.model';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'movement-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Angular Material
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './movement-history.html',
  styleUrls: ['./movement-history.scss']
})
export class MovementHistory implements OnInit {

  private movementService = inject(StockMovementService);
  private productService = inject(ProductService);

  displayedColumns = ['date', 'product', 'type', 'quantity', 'description', 'user'];

  movements: any[] = [];
  filtered: any[] = [];
  products: Product[] = [];

  filterProduct: any = '';
  filterType: any = '';
  filterDateFrom!: Date | null;
  filterDateTo!: Date | null;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.movementService.getAll().subscribe(movs => {
      this.productService.getAll().subscribe(products => {

        this.products = products;

        this.movements = movs.map(m => ({
          ...m,
          productName: products.find(p => p.id === m.productId)?.name ?? '—'
        }));

        this.filtered = [...this.movements];
      });
    });
  }

  applyFilters() {
    this.filtered = this.movements.filter(m => {

      // PRODUCTO
      if (this.filterProduct && m.productId !== this.filterProduct)
        return false;

      // TIPO
      if (this.filterType && m.movementType !== this.filterType)
        return false;

      // RANGO FECHAS
      const date = new Date(m.createdAt);

      if (this.filterDateFrom && date < this.filterDateFrom)
        return false;

      if (this.filterDateTo) {
        let end = new Date(this.filterDateTo);
        end.setHours(23, 59, 59);
        if (date > end) return false;
      }

      return true;
    });
  }
}
