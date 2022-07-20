import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IAgentContract } from '../interfaces/i-agent-contract';
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

  getContracts(id: number): Observable<IAgentContract> {
    return this.http
      .get<IAgentContract>(`${this.urlContract}/${id}`)
      .pipe(take(1));
  }

  getAgentPlayers(id: number): Observable<{ count: number; rows: any[] }> {
    return this.http
      .get<{ count: number; rows: any[] }>(`${this.url}/players/${id}`)
      .pipe(take(1));
  }

  updateStatus(updateObj: any): Observable<any> {
    return this.http.put<any>(this.urlUpdateStatus, updateObj).pipe(take(1));
  }

  updateContract(id: number, updateObj: any): Observable<any> {
    return this.http
      .put<any>(`${this.urlContract}/${id}`, updateObj)
      .pipe(take(1));
  }
}
