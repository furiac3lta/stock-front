import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { CategoryDialog } from './category-dialog';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <div class="header">
      <h1>Categorías</h1>
      <button mat-raised-button color="primary" (click)="openDialog()">
        <mat-icon>add</mat-icon>
        Nueva Categoría
      </button>
    </div>

    <table mat-table [dataSource]="categories" class="mat-elevation-z8">

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nombre</th>
        <td mat-cell *matCellDef="let c">{{ c.name }}</td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Descripción</th>
        <td mat-cell *matCellDef="let c">{{ c.description }}</td>
      </ng-container>

      <ng-container matColumnDef="active">
        <th mat-header-cell *matHeaderCellDef>Activo</th>
        <td mat-cell *matCellDef="let c">
          <mat-icon [ngClass]="{ active: c.active, inactive: !c.active }">
            {{ c.active ? 'check_circle' : 'cancel' }}
          </mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let c">
          <button mat-icon-button color="accent" (click)="openDialog(c)">
            <mat-icon>edit</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>

    </table>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
    }
    .active { color: green; }
    .inactive { color: red; }
  `]
})
export class CategoryList implements OnInit {
  private service = inject(CategoryService);
  private dialog = inject(MatDialog);

  categories: Category[] = [];
  cols = ['name', 'description', 'active', 'actions'];

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.categories = res);
  }

  openDialog(category?: Category) {
    const dialogRef = this.dialog.open(CategoryDialog, {
      width: '420px',
      data: category ? {...category} : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.load();
    });
  }
}
