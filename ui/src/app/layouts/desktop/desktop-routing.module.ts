import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './desktop.component';

const routes: Routes = [
  {
    path: '',
    component: DesktopComponent,
    loadChildren: () =>
      import('./d-pages/d-page.module').then((m) => m.DPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./d-pages/d-login/d-login.module').then((m) => m.DLoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./d-pages/d-register/d-register.module').then(
        (m) => m.DRegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesktopRoutingModule {}
