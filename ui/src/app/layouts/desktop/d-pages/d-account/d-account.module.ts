import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DAccountRoutingModule } from './d-account-routing.module';
import { DAccountComponent } from './d-account.component';


@NgModule({
  declarations: [
    DAccountComponent
  ],
  imports: [
    CommonModule,
    DAccountRoutingModule
  ]
})
export class DAccountModule { }
