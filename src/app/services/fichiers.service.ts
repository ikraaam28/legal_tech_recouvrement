import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fichiers } from '../Models/Fichiers';

@Injectable({
  providedIn: 'root'
})
export class FichiersService {
  private baseUrl = 'http://127.0.0.1:8000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  registerfichiers(userData: Fichiers): Observable<any> {
    const url = `${this.baseUrl}/fichiers/fichiercreated`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }
  Updatefichiers(id:number, userData: Fichiers): Observable<any> {
    const url = `${this.baseUrl}/fichiers/${id}`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers });
  }
  deletefichiers(id: number): Observable<any> {
    const url = `${this.baseUrl}/fichiers/delete/${id}`;
    const headers = new HttpHeaders ({
       'Content-Type': 'application/json' });
    return this.http.delete(url, { headers });
  }
  getFichesImpayes(): Observable<any> {
    const url = `${this.baseUrl}/fichiers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers });
  }
  Getfichiers(id:number): Observable<any> {
    const url = `${this.baseUrl}/fichiers/${id}`;
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.get(url, { headers });
  }
}
