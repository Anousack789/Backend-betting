import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DMenuManagementComponent } from './d-menu-management.component';

const routes: Routes = [
  {
    path: '',
    component: DMenuManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DMenuManagementRoutingModule {}
