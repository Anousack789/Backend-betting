import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DAgentContractManagementRoutingModule } from './d-agent-contract-management-routing.module';
import { DAgentContractManagementComponent } from './d-agent-contract-management.component';


@NgModule({
  declarations: [
    DAgentContractManagementComponent
  ],
  imports: [
    CommonModule,
    DAgentContractManagementRoutingModule
  ]
})
export class DAgentContractManagementModule { }
