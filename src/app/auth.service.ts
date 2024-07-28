import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBase = 'http://localhost:5205/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiBase + 'Account/Login', {
      username,
      password,
    });
  }
}
