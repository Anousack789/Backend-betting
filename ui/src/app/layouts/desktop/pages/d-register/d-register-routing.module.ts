import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DRegisterComponent } from './d-register.component';

const routes: Routes = [
  {
    path: '',
    component: DRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DRegisterRoutingModule {}
