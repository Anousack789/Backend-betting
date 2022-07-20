import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AgentApiService } from 'src/app/apis/agent-api.service';
import { IAgentContract } from 'src/app/interfaces/i-agent-contract';
import { LoadingService } from 'src/app/services/loading.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-agent-contract',
  templateUrl: './d-agent-contract.component.html',
  styleUrls: ['./d-agent-contract.component.scss'],
})
export class DAgentContractComponent implements OnInit, OnDestroy {
  constructor(
    private api: AgentApiService,
    private loading: LoadingService,
    private fb: FormBuilder
  ) {}

  @Input() id = 0;
  private subs = new SubSink();

  contract: IAgentContract | undefined;

  contractForm = this.fb.group({
    DepositCommission: [0, [Validators.min(0)]],
    DepositType: [0],
    WithdrawalCommission: [0, [Validators.min(0)]],
    WithdrawalType: [0],
    RecruitCommission: [0, [Validators.min(0)]],
    RecruitType: [0],
  });

  private onLoading = false;

  ngOnInit(): void {
    this.loading.setLoading = true;
    this.onLoading = true;
    this.subs.sink = this.api.getContracts(this.id).subscribe({
      next: (res) => {
        this.loading.setLoading = false;
        this.onLoading = false;
        this.contract = res;
        this.contractForm.patchValue({ ...res });
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

  onSubmit(): void {
    if (this.onLoading) return;
    if (this.contractForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill all required fields',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    this.onLoading = true;
    this.loading.setLoading = true;
    const model = {
      ...this.contractForm.value,
    };
    this.subs.sink = this.api.updateContract(this.id, model).subscribe({
      next: (res) => {
        console.log(res);
        this.loading.setLoading = false;
        this.onLoading = false;
        Swal.fire({
          title: 'Success',
          text: 'Contract updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
      error: (err) => {
        console.error(err);
        this.loading.setLoading = false;
        this.onLoading = false;
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
