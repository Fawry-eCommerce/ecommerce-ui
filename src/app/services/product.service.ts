import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { Product } from '../models/product/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = `${environment.apiUrl}:8004/product-api`;

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`${this.baseUrl}/products?page=${page}&size=${size}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

}
