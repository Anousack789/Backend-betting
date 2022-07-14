import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./d-dashboard/d-dashboard.module').then(
        (m) => m.DDashboardModule
      ),
  },
  {
    path: 'agent-management',
    loadChildren: () =>
      import('./d-agent-management/d-agent-management.module').then(
        (m) => m.DAgentManagementModule
      ),
  },
  {
    path: 'player-management',
    loadChildren: () =>
      import('./d-player-management/d-player-management.module').then(
        (m) => m.DPlayerManagementModule
      ),
  },
  {
    path: 'agent-contract-management',
    loadChildren: () =>
      import(
        './d-agent-contract-management/d-agent-contract-management.module'
      ).then((m) => m.DAgentContractManagementModule),
  },
  {
    path: 'menu-management',
    loadChildren: () =>
      import('./d-menu-management/d-menu-management.module').then(
        (m) => m.DMenuManagementModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./d-account/d-account.module').then((m) => m.DAccountModule),
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./d-wallet/d-wallet.module').then((m) => m.DWalletModule),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./d-transactions/d-transactions.module').then(
        (m) => m.DTransactionsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DPageRoutingModule {}
