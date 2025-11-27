import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/categories';

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }
}
