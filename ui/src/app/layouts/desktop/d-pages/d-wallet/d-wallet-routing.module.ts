import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DWalletComponent } from './d-wallet.component';

const routes: Routes = [
  {
    path: '',
    component: DWalletComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DWalletRoutingModule {}
