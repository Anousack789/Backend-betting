import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AgentApiService } from 'src/app/apis/agent-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-agent-contract',
  templateUrl: './d-agent-contract.component.html',
  styleUrls: ['./d-agent-contract.component.scss'],
})
export class DAgentContractComponent implements OnInit, OnDestroy {
  constructor(private api: AgentApiService, private loading: LoadingService) {}

  @Input() id = 0;
  private subs = new SubSink();

  ngOnInit(): void {
    this.loading.setLoading = true;
    this.subs.sink = this.api.getContracts(this.id).subscribe({
      next: (res) => {
        this.loading.setLoading = false;
        console.log(res);
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
