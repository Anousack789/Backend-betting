import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DDashboardRoutingModule } from './d-dashboard-routing.module';
import { DDashboardComponent } from './d-dashboard.component';


@NgModule({
  declarations: [
    DDashboardComponent
  ],
  imports: [
    CommonModule,
    DDashboardRoutingModule
  ]
})
export class DDashboardModule { }
