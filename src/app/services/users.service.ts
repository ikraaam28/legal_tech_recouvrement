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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, body, { headers });
  }
  UpdateUser(id:number, userData: User): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    const body = JSON.stringify(userData);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(url, body, { headers });
  }
  deleteUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/delete/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(url, { headers });
  }
  getUsers(): Observable<any> {
    const url = `${this.baseUrl}/getAllUsers`;
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });
    return this.http.get(url, { headers });
  }
  getUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/getRole/${id}`; // Update the URL
    const token = localStorage.getItem('jwt'); // Update the token retrieval
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url, { headers });
  }
  GetRoleUser(email: string): Observable<any> {
    const url = `${this.baseUrl}/users/getRole/${email}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get(url, { headers });
  }
  
  
}

  

