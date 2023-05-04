import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token: string | null = null;

  constructor(private http: HttpClient) { }
   private API_URL='http://127.0.0.1:8000/login';
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.API_URL, {
      email: email,
      password: password
    });
  }
  private apiUrl = 'http://localhost:8000/api';

 

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string | null): void {
    this.token = token;
  }
  logout(token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/logout`, null, { headers })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // return true if token exists, false otherwise
  }

  getUserRole($token?: string): string {

    if ($token) {
      const decodedToken = jwt_decode($token) as { roles: string[] };
      const roles = decodedToken.roles;
      if (roles.includes("Centre D'appel")) {
        return  "Centre D'appel";
      } else if (roles.includes('admin')) {
        return   'admin';
      } else if (roles.includes('user')) {
        return   'user';
      }
    }
    console.log('getUserRole');
    return '';
  }
}
