import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { AgentApiService } from 'src/app/apis/agent-api.service';
import { IUser } from 'src/app/interfaces/i-user';
import { LoadingService } from 'src/app/services/loading.service';
import { MySocketIo } from 'src/app/utils/my-socket-io';
import { SubSink } from 'subsink';
import { delay } from 'rxjs';

@Component({
  selector: 'app-d-agent-management',
  templateUrl: './d-agent-management.component.html',
  styleUrls: ['./d-agent-management.component.scss'],
})
export class DAgentManagementComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  constructor(
    private api: AgentApiService,
    private loading: LoadingService,
    private socket: MySocketIo,
    private cookie: CookieService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  onLoading = false;
  private subs = new SubSink();

  detail = undefined;

  dataSource = new MatTableDataSource<IUser>();
  displayedColumns: string[] = [
    'id',
    'UserName',
    'ContactNo',
    'Wallet',
    'BonusCredit',
    'process',
  ];

  ngOnInit(): void {
    this.onLoading = true;
    this.loading.setLoading = true;
    this.subs.sink = this.api
      .get()
      .pipe(delay(200))
      .subscribe({
        next: (data) => {
          this.onLoading = false;
          this.loading.setLoading = false;
          this.dataSource.data = data;
        },
      });
  }

  ngAfterViewInit(): void {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  openDetail(id: number) {
    this.onLoading = !this.onLoading;
    this.loading.setLoading = this.onLoading;
  }
}
