import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notes } from '../Models/Notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'http://127.0.0.1:8000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  registernotes(userData: Notes): Observable<any> {
    const url = `${this.baseUrl}/notes/notecreated`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }
  Updatenotes(id:number, userData: Notes): Observable<any> {
    const url = `${this.baseUrl}/notes/${id}`;
    const body = JSON.stringify(userData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers });
  }
  deletenotes(id: number): Observable<any> {
    const url = `${this.baseUrl}/notes/delete/${id}`;
    const headers = new HttpHeaders ({
       'Content-Type': 'application/json' });
    return this.http.delete(url, { headers });
  }
  getnotes(): Observable<any> {
    const url = `${this.baseUrl}/notes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(url, { headers });
  }
  Getnote(id:number): Observable<any> {
    const url = `${this.baseUrl}/notes/${id}`;
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.get(url, { headers });
  }
}
