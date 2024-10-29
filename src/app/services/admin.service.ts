import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // baseUrl: string = `${environment.apiUrl}/admin-api/admins`;
  baseUrl: string = `http://localhost:8008/admin-api/admins`;

  constructor(
    private http: HttpClient
  ) { }

  getAllAdmins() {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllRoles() {
    return this.http.get(`${this.baseUrl}/roles`);
  }

  addAdmin(admin: any) {
    return this.http.post(`${this.baseUrl}`, admin);
  }

}
