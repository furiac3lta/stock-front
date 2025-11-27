import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/products';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
