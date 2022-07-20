import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DAgentManagementRoutingModule } from './d-agent-management-routing.module';
import { DAgentManagementComponent } from './d-agent-management.component';
import { DAgentManagementMaterialModule } from './d-agent-management-material.module';
import { DEditBalanceDialogComponent } from './d-edit-balance-dialog/d-edit-balance-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DAgentDetailComponent } from './d-agent-detail/d-agent-detail.component';
import { DAgentInformationComponent } from './d-agent-detail/d-agent-information/d-agent-information.component';
import { DAgentContractComponent } from './d-agent-detail/d-agent-contract/d-agent-contract.component';
import { DAgentPlayersComponent } from './d-agent-detail/d-agent-players/d-agent-players.component';

@NgModule({
  declarations: [
    DAgentManagementComponent,
    DEditBalanceDialogComponent,
    DAgentDetailComponent,
    DAgentInformationComponent,
    DAgentContractComponent,
    DAgentPlayersComponent,
  ],
  imports: [
    CommonModule,
    DAgentManagementRoutingModule,
    DAgentManagementMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DAgentManagementModule {}
