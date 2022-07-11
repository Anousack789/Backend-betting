import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyCryptoService {
  constructor() {}

  private key = CryptoJS.enc.Utf8.parse(environment.cryptoKey);
  private iv = environment.iv;
  private configuration = {
    iv: CryptoJS.enc.Utf8.parse(this.iv),
    mode: CryptoJS.mode.CBC,
    format: CryptoJS.format.Hex,
  };

  encrypt(text: string): string {
    let encrypted = CryptoJS.AES.encrypt(text, this.key, this.configuration);
    return encrypted.toString();
  }

  decrypt(text: string): string {
    return CryptoJS.AES.decrypt(text, this.key, this.configuration).toString(
      CryptoJS.enc.Utf8
    );
  }
}
