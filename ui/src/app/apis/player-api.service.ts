import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { Config } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class PlayerApiService {
  constructor(private http: HttpClient) {}

  private url = Config.EndPoint + 'players';

  gets(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }

  updateStatus(updateObj: any): Observable<IUser> {
    return this.http.put<IUser>(this.url, updateObj);
  }
}
