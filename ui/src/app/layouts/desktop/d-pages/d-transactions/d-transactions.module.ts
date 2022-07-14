import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DTransactionsRoutingModule } from './d-transactions-routing.module';
import { DTransactionsComponent } from './d-transactions.component';


@NgModule({
  declarations: [
    DTransactionsComponent
  ],
  imports: [
    CommonModule,
    DTransactionsRoutingModule
  ]
})
export class DTransactionsModule { }
