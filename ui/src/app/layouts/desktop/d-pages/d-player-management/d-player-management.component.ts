import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MySocketIo } from 'src/app/utils/my-socket-io';

@Component({
  selector: 'app-d-player-management',
  templateUrl: './d-player-management.component.html',
  styleUrls: ['./d-player-management.component.scss'],
})
export class DPlayerManagementComponent implements OnInit {
  constructor(private socket: MySocketIo) {}

  ngOnInit(): void {}
}
