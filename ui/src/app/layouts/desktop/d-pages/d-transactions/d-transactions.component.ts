import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminApiService } from 'src/app/apis/admin-api.service';
import { TransactionApiService } from 'src/app/apis/transaction-api.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-transactions',
  templateUrl: './d-transactions.component.html',
  styleUrls: ['./d-transactions.component.scss'],
})
export class DTransactionsComponent implements OnInit, OnDestroy {
  constructor(private api: TransactionApiService) {}

  private subs = new SubSink();

  onLoading = false;

  ngOnInit(): void {
    this.onLoading = true;
    this.subs.sink = this.api.get().subscribe({
      next: (data) => {
        this.onLoading = false;
        console.log(data);
      },
      error: (err) => {
        this.onLoading = false;
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
