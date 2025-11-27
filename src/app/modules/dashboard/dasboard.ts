import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';

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

  totalProductos = 0;
  totalCategorias = 0;
  valorInventario = 0;

  stockBajo: Product[] = [];
  ultimosProductos: Product[] = [];

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getAll().subscribe((products: Product[]) => {

      this.totalProductos = products.length;

      this.valorInventario = products.reduce(
        (acc, p) => acc + (p.salePrice * p.stock),
        0
      );

      this.stockBajo = products.filter(p => p.stock <= 5);

      this.ultimosProductos = [...products]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.totalCategorias = categories.length;
    });
  }
}
