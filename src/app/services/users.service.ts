import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://127.0.0.1:8000'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  registerUser(userData: User): Observable<any> {
    const url = `${this.baseUrl}/userCreate`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }
  UpdateUser(id:number, userData: User): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers });
  }
  deleteUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/delete/${id}`;
    const headers = new HttpHeaders ({
       'Content-Type': 'application/json' });
    
    return this.http.delete(url, { headers });
  }
  getUsers(): Observable<any> {
    const url = `${this.baseUrl}/api/getAllUsers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers });
  }
  
}

  
