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
  private urlUpdateStatus = Config.EndPoint + 'agents/update-status';
  private urlContract = Config.EndPoint + 'agents/contracts';

  gets(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url).pipe(take(1));
  }

  updateStatus(updateObj: any): Observable<any> {
    return this.http.post<any>(this.urlUpdateStatus, updateObj).pipe(take(1));
  }

  getContracts(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlContract}/${id}`).pipe(take(1));
  }
}
