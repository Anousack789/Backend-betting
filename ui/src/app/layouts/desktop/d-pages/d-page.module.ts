import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DPageRoutingModule } from './d-page-routing.module';

import { SocketIoModule } from 'ngx-socket-io';
import { MySocketIo } from 'src/app/utils/my-socket-io';

@NgModule({
  imports: [CommonModule, DPageRoutingModule, SocketIoModule],
  providers: [MySocketIo],
})
export class DPageModule {}
