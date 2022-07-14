import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DAgentManagementComponent } from './d-agent-management.component';

const routes: Routes = [
  {
    path: '',
    component: DAgentManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DAgentManagementRoutingModule {}
