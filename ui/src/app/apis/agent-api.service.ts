import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { Config } from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class AgentApiService {
  constructor(private http: HttpClient) {}
  private url = Config.EndPoint + 'agents';

  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url).pipe(take(1));
  }
}
