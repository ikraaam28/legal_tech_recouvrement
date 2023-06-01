import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { calendrier } from '../Models/calendrier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  private baseUrl = 'http://127.0.0.1:8000'; 


  constructor(private http: HttpClient) { }

  addEvent(eventData: calendrier): Observable<any> {
    const url = `${this.baseUrl}/calendrier/eventCreate`;
    const body = JSON.stringify(eventData);
    const headers = new HttpHeaders ({ 
      'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }

  deleteEvent(id: number): Observable<any> {
    const url = `${this.baseUrl}/calendrier/delete/${id}`;
    const headers = new HttpHeaders ({
       'Content-Type': 'application/json' });
    
    return this.http.delete(url, { headers });
  }




}
