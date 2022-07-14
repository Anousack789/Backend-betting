import { Injectable } from '@angular/core';
import { IMenu } from '../interfaces/i-menu';
import { MyCryptoService } from './my-crypto.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private myCrypto: MyCryptoService) {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      this.menus = JSON.parse(this.myCrypto.decrypt(authToken));
    }
  }

  menus: IMenu[] = [];
}
