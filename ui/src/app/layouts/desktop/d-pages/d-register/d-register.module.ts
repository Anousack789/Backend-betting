import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DRegisterRoutingModule } from './d-register-routing.module';
import { DRegisterComponent } from './d-register.component';


@NgModule({
  declarations: [
    DRegisterComponent
  ],
  imports: [
    CommonModule,
    DRegisterRoutingModule
  ]
})
export class DRegisterModule { }
