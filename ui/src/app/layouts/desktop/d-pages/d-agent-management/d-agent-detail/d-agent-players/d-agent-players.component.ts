import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgentApiService } from 'src/app/apis/agent-api.service';
import { IUser } from 'src/app/interfaces/i-user';
import { LoadingService } from 'src/app/services/loading.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-agent-players',
  templateUrl: './d-agent-players.component.html',
  styleUrls: ['./d-agent-players.component.scss'],
})
export class DAgentPlayersComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  constructor(private loading: LoadingService, private api: AgentApiService) {}

  @Input() id = 0;
  private subs = new SubSink();

  displayedColumns: string[] = ['id', 'UserName', 'Wallet'];
  dataSource = new MatTableDataSource<{
    id: number;
    UserName: string;
    Wallet: number;
  }>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  onLoading = false;
  ngOnInit(): void {
    this.onLoading = true;
    this.loading.setLoading = true;
    this.subs.sink = this.api.getAgentPlayers(this.id).subscribe({
      next: (data) => {
        console.log(data.rows);
        //this.dataSource.data = data.rows;
        this.onLoading = false;
        this.loading.setLoading = false;
      },
      error: (err) => {
        this.onLoading = false;
        this.loading.setLoading = false;
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: err.message || 'Something went wrong',
          icon: 'error',
        });
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
}
