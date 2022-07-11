import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DMenuManagementRoutingModule } from './d-menu-management-routing.module';
import { DMenuManagementComponent } from './d-menu-management.component';


@NgModule({
  declarations: [
    DMenuManagementComponent
  ],
  imports: [
    CommonModule,
    DMenuManagementRoutingModule
  ]
})
export class DMenuManagementModule { }
