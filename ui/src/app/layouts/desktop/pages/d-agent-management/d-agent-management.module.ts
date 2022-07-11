import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DAgentManagementRoutingModule } from './d-agent-management-routing.module';
import { DAgentManagementComponent } from './d-agent-management.component';


@NgModule({
  declarations: [
    DAgentManagementComponent
  ],
  imports: [
    CommonModule,
    DAgentManagementRoutingModule
  ]
})
export class DAgentManagementModule { }
