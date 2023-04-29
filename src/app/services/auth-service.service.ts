import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
   private API_URL='http://127.0.0.1:8000/api/login_check';
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.API_URL, {
      email: email,
      password: password
    });
  }
}
