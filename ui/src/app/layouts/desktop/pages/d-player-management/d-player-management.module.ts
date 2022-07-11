import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DPlayerManagementRoutingModule } from './d-player-management-routing.module';
import { DPlayerManagementComponent } from './d-player-management.component';


@NgModule({
  declarations: [
    DPlayerManagementComponent
  ],
  imports: [
    CommonModule,
    DPlayerManagementRoutingModule
  ]
})
export class DPlayerManagementModule { }
