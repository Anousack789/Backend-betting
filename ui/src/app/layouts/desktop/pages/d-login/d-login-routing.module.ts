import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DLoginComponent } from './d-login.component';

const routes: Routes = [
  {
    path: '',
    component: DLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DLoginRoutingModule {}
