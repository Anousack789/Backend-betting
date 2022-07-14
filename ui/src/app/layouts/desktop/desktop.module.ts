import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopRoutingModule } from './desktop-routing.module';
import { DesktopComponent } from './desktop.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [DesktopComponent],
  imports: [CommonModule, DesktopRoutingModule, MatIconModule, MatMenuModule],
})
export class DesktopModule {}
