import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrl: string = `${environment.apiUrl}/store-api`;

  constructor(private http: HttpClient) { }

  getStores(page: number, size: number): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}/stores?page=${page}&size=${size}`);
  }

  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.baseUrl}/stores/${id}`);
  }

  createStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${this.baseUrl}/stores`, store);
  }

  updateStore(id: number, store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.baseUrl}/stores/${id}`, store);
  }

  deleteStore(id: number): Observable<Store> {
    return this.http.delete<Store>(`${this.baseUrl}/stores/${id}`);
  }

  searchProductsByStoreId(storeId: number, name: string, category: string, page: number, size: number): Observable<Store> {
    let params = new HttpParams()
      .append('name', name)
      .append('category', category);
      
    return this.http.get<Store>(
      `${this.baseUrl}/stores/${storeId}/products?${category}&page=${page}&size=${size}`,
      { params: params }
    );
  }

}
