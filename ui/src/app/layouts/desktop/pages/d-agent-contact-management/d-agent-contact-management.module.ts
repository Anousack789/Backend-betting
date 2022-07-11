import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DAgentContactManagementRoutingModule } from './d-agent-contact-management-routing.module';
import { DAgentContactManagementComponent } from './d-agent-contact-management.component';


@NgModule({
  declarations: [
    DAgentContactManagementComponent
  ],
  imports: [
    CommonModule,
    DAgentContactManagementRoutingModule
  ]
})
export class DAgentContactManagementModule { }
