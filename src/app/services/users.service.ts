import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }
  
  private apiBaseUrl = 'http://127.0.0.1:8000/api/getAllUsers';

  getUsers(): Observable<User[]> {
    let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODE2NzIwMDYsImV4cCI6MTY4NDI2NDAwNiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJlbWFpbCI6ImlrcmFtc2VnbmkyOEBnbWFpbC5jb20ifQ.X0icRig0aaBTfYAFvplOQtSW1n-z34lnlhpvzpi_xC1XCl2KpLlYZdr7Rb91vK20SYwNcn3n0hCUzguVHJKRyPIJgVX8oOAZX6inYMbbb1yjgJuYxIy1tY2tPE0--QEfN_KyRlVJ5R8aZDJZGy_kumLDX3QwtFK1esfUl8rN-wtUldFtg9gBgMV4TgFhYNdqX2iucn3hq_-mK73GfPe6R9B5qeHXezpzOqsiIrWpGEtw5h_7GVRzfWUhpWWeo87AVELeP-1fTpcBEH1TGsM2vxyS1avDkD9PWFGNUogeZ_b-5YksoE2gpdBLvXfizpAFqNFl6j0IKJsXBggI25h8Zg';
    let head_obj=new HttpHeaders().set("Authorization", "bearer " + token);
    return this.http.get<User[]>(`${this.apiBaseUrl}`, { headers: head_obj });

  }
}

  

