import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = `${environment.apiUrl}/admin-api/auth`;

  userData = new BehaviorSubject(null);

  headers: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    let token = this.getToken();
    if (token) {
      this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      this.headers = new HttpHeaders();
    }
    if (this.isLogin()) {
      this.decodeUserData();
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.userData.subscribe(() => {
      setTimeout(() => {
        if (this.getUserEmail()) {
          this.logOut();
        }
      }, 86400000);
    });
  }

  decodeUserData() {
    try {
      let token = this.getToken();
      if (!token) {
        throw new Error('Token not found');
      }
      let decodedToken: any = jwtDecode(token);
      if (this.userData.value == null) {
        this.userData.next(decodedToken);
      }
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  getUserEmail() {
    if (this.isLogin()) {
      return this.decodeUserData().sub || "";
    }
  }

  login(userData: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  register(userData: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  logOut() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }

  isLogin(): boolean {
    return localStorage.getItem('token') != null;
  }

  isAdmin(): boolean {
    let roles = ['NORMAL', 'ADVANCED', 'SUPER'];
    let userRole = this.decodeUserData()?.role;
    return roles.includes(userRole);
  }

}
