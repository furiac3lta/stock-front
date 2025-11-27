import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { StockMovementService } from '../../core/services/stock-movement.service';

import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';
import { StockMovement } from '../../core/models/stock-movement.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private movementService = inject(StockMovementService);

  totalProductos = 0;
  totalCategorias = 0;
  valorInventario = 0;
  totalStock = 0;
  totalMovimientosHoy = 0;

  stockBajo: Product[] = [];
  ultimosProductos: Product[] = [];

  // <-- AHORA tipado correctamente
  ultimosMovimientos: MovementView[] = [];

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.loadMovements();
  }

  loadProducts() {
    this.productService.getAll().subscribe((products: Product[]) => {

      this.totalProductos = products.length;

      this.valorInventario = products.reduce(
        (acc, p) => acc + (p.salePrice * p.stock),
        0
      );

      this.totalStock = products.reduce(
        (acc, p) => acc + (p.stock ?? 0),
        0
      );

      this.stockBajo = products.filter(p => p.stock <= 5);

      this.ultimosProductos = [...products]
        .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
        .slice(0, 5);
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.totalCategorias = categories.length;
    });
  }

  loadMovements() {
    this.movementService.getAll().subscribe((movements: StockMovement[]) => {

      const today = new Date().toISOString().slice(0, 10);

      // Movimientos de HOY
      this.totalMovimientosHoy = movements
        .filter(m => m.createdAt?.startsWith(today))
        .length;

      // Agregado de productName
      this.productService.getAll().subscribe(products => {

        this.ultimosMovimientos = movements
          .map(m => ({
            ...m,
            productName: products.find(p => p.id === m.productId)?.name || '—'
          }))
          .sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);
      });
    });
  }
}

// Tipo extendido que sí incluye productName
interface MovementView {
  id: number;
  productId: number;
  movementType: string;
  quantity: number;
  createdAt: string;
  productName: string;  // <-- necesario para HTML
}
