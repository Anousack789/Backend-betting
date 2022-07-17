import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DAgentManagementRoutingModule } from './d-agent-management-routing.module';
import { DAgentManagementComponent } from './d-agent-management.component';
import { DAgentManagementMaterialModule } from './d-agent-management-material.module';
import { DEditBalanceDialogComponent } from './d-edit-balance-dialog/d-edit-balance-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DAgentManagementComponent, DEditBalanceDialogComponent],
  imports: [
    CommonModule,
    DAgentManagementRoutingModule,
    DAgentManagementMaterialModule,
    FormsModule,
  ],
})
export class DAgentManagementModule {}
