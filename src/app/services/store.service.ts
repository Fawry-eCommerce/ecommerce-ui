import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store/store';
import { Stock } from '../models/store/stock';
import { ConsumptionRequest } from '../models/store/consumption-request';
import { StoreHistory } from '../models/store/store-history';
import { Page } from '../models/page';
import { Product } from '../models/product/Product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrl: string = `${environment.apiUrl}/store-api`;

  headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  getStores(page: number, size: number): Observable<Page<Store>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Page<Store>>(`${this.baseUrl}/stores?page=${page}&size=${size}`, { headers: headers });
  }

  getStoreById(id: number): Observable<Store> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Store>(`${this.baseUrl}/stores/${id}`, { headers: headers });
  }

  createStore(store: Store): Observable<Store> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Store>(`${this.baseUrl}/stores`, store, { headers: headers });
  }

  updateStore(id: number, store: Store): Observable<Store> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Store>(`${this.baseUrl}/stores/${id}`, store, { headers: headers });
  }

  deleteStore(id: number): Observable<Store> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<Store>(`${this.baseUrl}/stores/${id}`, { headers: headers });
  }

  searchProductsByStoreId(storeId: number, name: string = '', category: string = '', code: string = '', page: number, size: number): Observable<Product[]> {
    let params = new HttpParams()
      .append('storeId', storeId)
      .append('name', name)
      .append('category', category)
      .append('code', code);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      });

    return this.http.get<Product[]>(
      `${this.baseUrl}/stocks/search-products?page=${page}&size=${size}`,
      { params: params, headers: this.headers },
    );
  }

  addProductToStock(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'consumerEmail': this.authService.getUserEmail()
    });
    return this.http.post<Stock>(`${this.baseUrl}/stocks`, stock, { headers: headers });
  }

  consumeProductFromStock(consumeRequest: ConsumptionRequest): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<void>(`${this.baseUrl}/stocks/consume`, consumeRequest, { headers: headers });
  }

  getAllProductConsumptions(): Observable<Page<StoreHistory>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Page<StoreHistory>>(`${this.baseUrl}/consumptions`, { headers: headers });
  }

  getProductConsumptionByStoreId(storeId: number, page: number, size: number): Observable<Page<StoreHistory>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Page<StoreHistory>>(`${this.baseUrl}/consumptions/${storeId}?page=${page}&size=${size}`, { headers: headers });
  }

  gitStoreConsumptionByProductId(storeId: number, productId: number, page: number, size: number): Observable<Page<StoreHistory>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Page<StoreHistory>>(`${this.baseUrl}/consumptions/${storeId}/products/${productId}?page=${page}&size=${size}`, { headers: headers });
  }

}
