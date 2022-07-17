import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DLoginMaterialModule } from './d-login-material.module';
import { DLoginRoutingModule } from './d-login-routing.module';
import { DLoginComponent } from './d-login.component';
@NgModule({
  declarations: [DLoginComponent],
  imports: [
    CommonModule,
    DLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DLoginMaterialModule,
    FontAwesomeModule,
  ],
})
export class DLoginModule {}
