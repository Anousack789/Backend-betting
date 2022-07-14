import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthApiService } from '../apis/auth-api.service';

@Injectable()
export class MySocketIo extends Socket {
  constructor(auth: AuthApiService) {
    super({ url: 'http://localhost:3000', options: {} });
    // const apiAuth = auth.getAuth();
    // console.log('api-auth: ', apiAuth);
    // this.ioSocket['auth'] = { token: apiAuth };
  }
}
