import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './desktop.component';

const routes: Routes = [
  {
    path: '',
    component: DesktopComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/d-login/d-login.module').then((m) => m.DLoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/d-register/d-register.module').then(
        (m) => m.DRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesktopRoutingModule {}
