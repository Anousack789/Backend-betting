import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { RouterModule, ROUTES } from '@angular/router';
import { LayoutsService } from './layouts.service';

@NgModule({
  declarations: [LayoutsComponent],
  imports: [CommonModule, RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: LayoutsRoutingModule,
      deps: [LayoutsService],
      multi: true,
    },
  ],
})
export class LayoutsModule {}
