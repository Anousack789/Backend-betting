import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DWalletRoutingModule } from './d-wallet-routing.module';
import { DWalletComponent } from './d-wallet.component';


@NgModule({
  declarations: [
    DWalletComponent
  ],
  imports: [
    CommonModule,
    DWalletRoutingModule
  ]
})
export class DWalletModule { }
