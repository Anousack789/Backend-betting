import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../utils/config';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionApiService {
  constructor(private http: HttpClient) {}
  private url = Config.EndPoint + 'transactions';
  get() {
    return this.http.get(this.url).pipe(take(1));
  }
}
