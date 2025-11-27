import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Product } from '../../core/models/product.model';
import { StockService } from '../../core/services/stock.service';
import { MovementType } from '../../core/models/movement-type.enum';

@Component({
  selector: 'app-product-adjust',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
      MatSelectModule,
      MatOptionModule

  ],
  templateUrl: './product-adjust.html'
})
export class ProductAdjust {

  form = new FormGroup({
    quantity: new FormControl<number | null>(null, Validators.required),
    description: new FormControl<string | null>(''),
type: new FormControl<'IN' | 'OUT' | 'SET'>('IN', Validators.required)
  });

  username = 'admin'; // temporal

  constructor(
    public dialogRef: MatDialogRef<ProductAdjust>,   // ← AHORA EXISTE
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private service: StockService
  ) {}

  save() {
    if (this.form.invalid) return;

    const type = this.form.value.type === 'IN'
      ? MovementType.IN
      : MovementType.OUT;

    this.service.moveStock(
      this.data.id!,                        // product ID
      this.form.value.quantity!,            // cantidad
      type,                                 // IN / OUT
      this.form.value.description ?? '',    // descripción
      this.username                         // usuario
    ).subscribe(() => this.dialogRef.close(true));
  }
}
