import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AgentApiService } from 'src/app/apis/agent-api.service';
import { IUser } from 'src/app/interfaces/i-user';
import { LoadingService } from 'src/app/services/loading.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-agent-information',
  templateUrl: './d-agent-information.component.html',
  styleUrls: ['./d-agent-information.component.scss'],
})
export class DAgentInformationComponent implements OnInit, OnDestroy {
  constructor(private loading: LoadingService, private api: AgentApiService) {}

  @Input() detail: IUser | undefined;

  private subs = new SubSink();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  updateUserStatus(e: number) {
    const agentId = this.detail?.id;
    const status = e;
    this.loading.setLoading = true;
    this.subs.sink = this.api.updateStatus({ agentId, status }).subscribe({
      next: (res) => {
        console.log(res);
        this.loading.setLoading = false;
        this.detail!.UserStatus = Number(status);
      },
      error: (err) => {
        console.error(err);
        this.loading.setLoading = false;
        Swal.fire({
          title: 'Error',
          text: err.error?.message || 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }
}
