import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheImpaye } from '../Models/FicheImpaye';

@Injectable({
  providedIn: 'root'
})
export class FicheImpayeService {
  private baseUrl = 'http://127.0.0.1:8000'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  registerFicheImpaye(userData: FicheImpaye): Observable<any> {
    const url = `${this.baseUrl}/ficheImpaye/ficheImpayecreated`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }
  UpdateFicheImpaye(id:number, userData: FicheImpaye): Observable<any> {
    const url = `${this.baseUrl}/ficheImpaye/${id}`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers });
  }
  deleteFicheImpaye(id: number): Observable<any> {
    const url = `${this.baseUrl}/ficheImpaye/delete/${id}`;
    const headers = new HttpHeaders ({
       'Content-Type': 'application/json' });
    return this.http.delete(url, { headers });
  }
  getFichesImpayes(): Observable<any> {
    const url = `${this.baseUrl}/ficheImpaye`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers });
  }
  
}

  