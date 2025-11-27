import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { StockMovementService } from '../../core/services/stock-movement.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-movement-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './movement-in.html',
  styleUrls: ['./movement-in.css']
})
export class MovementIn {

  username = 'admin';

  form = new FormGroup({
    quantity: new FormControl<number | null>(null, Validators.required),
    description: new FormControl<string | null>(''),
  });

  constructor(
    public dialogRef: MatDialogRef<MovementIn>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private movementService: StockMovementService
  ) {}

  save() {
    if (this.form.invalid) return;

    this.movementService.move(
      this.data.id!,
      this.form.value.quantity!,
      'INCREASE',
      this.form.value.description ?? '',
      this.username
    ).subscribe({
      next: () => this.dialogRef.close(true),
      error: (e) => console.error(e)
    });
  }
}
