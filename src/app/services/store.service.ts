import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { Stock } from '../models/stock';
import { ConsumptionRequest } from '../models/consumption-request';
import { StoreHistory } from '../models/store-history';

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

  addProductToStock(stock: Stock): Observable<Store> {
    let headers = new HttpHeaders({
      'consumerEmail': 'demo-email@email.com'
    });

    return this.http.post<Store>(`${this.baseUrl}/stocks`, { stock }, { headers: headers });
  }

  consumeProductFromStock(consumeRequest: ConsumptionRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/stocks/consume`, { consumeRequest });
  }

  getAllProductConsumptions(): Observable<StoreHistory[]> {
    return this.http.get<StoreHistory[]>(`${this.baseUrl}/consumptions`);
  }

  getProductConsumptionByStoreId(storeId: number): Observable<StoreHistory[]> {
    return this.http.get<StoreHistory[]>(`${this.baseUrl}/consumptions/${storeId}`);
  }

  gitStoreConsumptionByProductId(storeId: number, productId: number, page: number, size: number): Observable<StoreHistory[]> {
    return this.http.get<StoreHistory[]>(`${this.baseUrl}/consumptions/${storeId}/products/${productId}?page=${page}&size=${size}`);
  }

}
