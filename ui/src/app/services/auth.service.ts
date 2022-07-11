import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/i-login-response';
import { Config } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private endpoint = Config.EndPoint;
  private loginUrl = this.endpoint + 'auth/login';
  private registerUrl = this.endpoint + 'auth/register';
  private logoutUrl = this.endpoint + 'auth/logout';

  login(userName: string, password: string): Observable<ILoginResponse> {
    const model = {
      userName,
      password,
    };
    return this.http.post<ILoginResponse>(this.loginUrl, model);
  }

  logut() {
    return this.http.post(this.logoutUrl, {});
  }

  register(usr: any) {
    return this.http.post(this.registerUrl, usr);
  }
}
