import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = `${environment.apiUrl}/admin-api/admins`;

  constructor(
    private http: HttpClient
  ) { }

  getAllAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles`);
  }

  addAdmin(admin: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}`, admin, { headers: headers });
  }

  toggleAdminStatus(adminId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}/toggle-active/${adminId}`, {}, { headers: headers });
  }

}
