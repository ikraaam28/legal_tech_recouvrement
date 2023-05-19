import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
interface LoginResponse {
  token: string;
  user: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token: string | null = null;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private API_URL = 'http://127.0.0.1:8000/login';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    if (this.isLoggedIn()) {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(this.getCurrentUser());
    }
   }

  login(email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(this.API_URL, {
      email: email,
      password: password
    }).pipe(
      tap(response => {
        const token = response.token;
        this.setToken(token);
        const user = response.user;
        this.setCurrentUser(user);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string | null): void {
    this.token = token;
    localStorage.setItem('token', token || '');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token) as { user_id: number };
      const userId = decodedToken.user_id;
      // Replace the following line with code to fetch the user from your API
      return userId ;
    }
    return null;
}

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token) as { roles: string[], exp: number };
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate > new Date();
    }
    return false;
  }
  public isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwt_decode(token) as { roles: string[] };
      const roles = decodedToken.roles;
      return roles.includes('admin');
    }
    return false;
  }
}
