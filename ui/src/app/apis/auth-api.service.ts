import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/i-login-response';
import { Config } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  private endpoint = Config.EndPoint;
  private loginUrl = this.endpoint + 'auth/login';
  private registerUrl = this.endpoint + 'auth/register';
  private logoutUrl = this.endpoint + 'auth/logout';

  private user: any;

  set setUser(_user: any) {
    this.user = _user;
  }

  login(userName: string, password: string): Observable<ILoginResponse> {
    const model = {
      userName,
      password,
    };
    return this.http.post<ILoginResponse>(this.loginUrl, model);
  }

  logout() {
    return this.http.post(this.logoutUrl, {});
  }

  register(usr: any) {
    return this.http.post(this.registerUrl, usr);
  }
}
