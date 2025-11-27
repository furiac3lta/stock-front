import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatInputModule, MatSlideToggleModule
  ],
  templateUrl: './category-form.html',
})
export class CategoryForm {

  private service = inject(CategoryService);
  public dialogRef = inject(MatDialogRef<CategoryForm>);

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string>('', { nonNullable: true }),
    active: new FormControl<boolean>(true, { nonNullable: true })
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Category | null) {}

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  save() {
    const value = this.form.getRawValue() as Category;
    const request = this.data
      ? this.service.update(this.data.id!, value)
      : this.service.create(value);

    request.subscribe(() => this.dialogRef.close(true));
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
