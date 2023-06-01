import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  sendEmail(email: string): Promise<any> {
    const url = 'http://127.0.0.1:8000/sendEmail';
    const body = { email };

    return this.http.post(url, body).toPromise();
  }

  resetPassword(token: string, password: string, confirmPassword: string): Promise<any> {
    const url = `http://localhost:8000/reset-password/${token}`;
    const data = {
      password: password,
      confirm_password: confirmPassword
    };
  
    return this.http.post(url, data).toPromise();
  }
  
}
