import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheImpaye } from '../Models/FicheImpaye';

@Injectable({
  providedIn: 'root'
})
export class FicheImpayeService {
  private baseUrl = 'http://127.0.0.1:8000'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  registerFicheImpaye(userData: FicheImpaye, id: number, formData: FormData | null): Observable<any> {
    const url = `${this.baseUrl}/ficheImpaye/ficheImpayecreated/${id}`;
    
    if (formData) {
      userData.justificatif_creances !== null ? formData.append('justificatif_creances', userData.justificatif_creances) : null;
      formData.append('userData', JSON.stringify(userData));
      console.log(userData.justificatif_creances);
    }
    
    return this.http.post(url, formData);
  }
  uploadFile(file: File, id:number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const params = new HttpParams().set("user_id", id.toString());
    return this.http.post(`${this.baseUrl}/upload_excel`, formData, { params });
  }
  UpdateFicheImpaye(id:number, ficheData: FicheImpaye): Observable<any> {
    const url = `${this.baseUrl}/ficheImpaye/${id}`;
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.put(url, ficheData, { headers });
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
  GetFicheImpaye(id:number): Observable<any> {
    const url = `${this.baseUrl}/ficheImpaye/${id}`;
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.get(url, { headers });
  }

}

  