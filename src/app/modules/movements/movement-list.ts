import { Component, inject, OnInit } from '@angular/core';
import { MovementService } from '../../core/services/movement.service';
import { ProductService } from '../../core/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'movement-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './movement-list.html'
})
export class MovementList implements OnInit {

  movementService = inject(MovementService);
  productService = inject(ProductService);

  displayedColumns = ['createdAt', 'product', 'movementType', 'quantity', 'createdBy', 'description'];
  data: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.movementService.getAll().subscribe((movements: any[]) => {

      // Orden por fecha descendente
      movements.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Cargar productos
      this.productService.getAll().subscribe((products: any[]) => {

        this.data = movements.map((m: any) => ({
          ...m,
          productName: products.find(p => p.id === m.productId)?.name ?? '—'
        }));
      });
    });
  }
}
