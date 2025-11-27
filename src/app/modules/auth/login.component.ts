import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface AuthRequest {
  username: string;
  password: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="login-wrapper">
      <mat-card>
        <h2>Login</h2>

        <form [formGroup]="form">
          <mat-form-field appearance="outline">
            <mat-label>Usuario</mat-label>
            <input matInput formControlName="username">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input matInput type="password" formControlName="password">
          </mat-form-field>

          <button mat-raised-button color="primary" (click)="submit()">
            Ingresar
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrapper {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    mat-card {
      width: 350px;
      padding: 20px;
    }
    button {
      margin-top: 15px;
      width: 100%;
    }
  `]
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;

  this.auth.login(this.form.getRawValue() as AuthRequest).subscribe({
  next: (res) => {
    this.auth.setToken(res.token);
    this.router.navigate(['/']);
  },
  error: () => {
    alert('Credenciales inválidas');
  }
});

  }
}
