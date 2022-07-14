import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../utils/config';
import { Observable, take } from 'rxjs';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpClient) {}
  private url = Config.EndPoint + 'admin/profile';
  getProfile(): Observable<IUser> {
    return this.http.get<IUser>(this.url).pipe(take(1));
  }
}
