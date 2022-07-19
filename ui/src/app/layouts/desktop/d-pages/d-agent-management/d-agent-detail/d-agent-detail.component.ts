import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user';

@Component({
  selector: 'app-d-agent-detail',
  templateUrl: './d-agent-detail.component.html',
  styleUrls: ['./d-agent-detail.component.scss'],
})
export class DAgentDetailComponent implements OnInit {
  constructor() {}

  @Input() detail: IUser | undefined;
  @Output() close = new EventEmitter();

  tabIndex = 0;

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }
}
