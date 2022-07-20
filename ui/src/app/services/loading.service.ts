import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  private isLoading = new BehaviorSubject(false);

  set setLoading(value: boolean) {
    this.isLoading.next(value);
  }

  get _isLoading() {
    return this.isLoading.asObservable();
  }
}
