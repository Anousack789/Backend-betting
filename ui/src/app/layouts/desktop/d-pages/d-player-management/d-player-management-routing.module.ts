import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DPlayerManagementComponent } from './d-player-management.component';

const routes: Routes = [
  {
    path: '',
    component: DPlayerManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DPlayerManagementRoutingModule {}
