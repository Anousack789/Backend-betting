import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DAgentManagementRoutingModule } from './d-agent-management-routing.module';
import { DAgentManagementComponent } from './d-agent-management.component';
import { DAgentManagementMaterialModule } from './d-agent-management-material.module';

@NgModule({
  declarations: [DAgentManagementComponent],
  imports: [
    CommonModule,
    DAgentManagementRoutingModule,
    DAgentManagementMaterialModule,
  ],
  providers: [],
})
export class DAgentManagementModule {}
