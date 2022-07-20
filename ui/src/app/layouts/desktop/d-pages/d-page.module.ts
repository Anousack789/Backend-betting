import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DPageRoutingModule } from './d-page-routing.module';

import { SocketIoModule } from 'ngx-socket-io';
import { MySocketIo } from 'src/app/utils/my-socket-io';
import { DPageComponent } from './d-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    DPageRoutingModule,
    SocketIoModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [MySocketIo],
  declarations: [DPageComponent],
})
export class DPageModule {}
