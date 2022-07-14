import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DTransactionsComponent } from './d-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: DTransactionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DTransactionsRoutingModule {}
