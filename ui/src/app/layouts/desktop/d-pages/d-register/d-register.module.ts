import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DRegisterRoutingModule } from './d-register-routing.module';
import { DRegisterComponent } from './d-register.component';
import { DRegisterMaterialModule } from './d-register-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DRegisterComponent],
  imports: [
    CommonModule,
    DRegisterRoutingModule,
    DRegisterMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DRegisterModule {}
