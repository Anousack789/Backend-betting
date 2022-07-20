import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  SideBarOpenAnimation,
  SideBarCloseAnimation,
} from 'src/app/animations/side-bar-animation';
import { AuthApiService } from 'src/app/apis/auth-api.service';
import { IMenu } from 'src/app/interfaces/i-menu';
import { LoadingService } from 'src/app/services/loading.service';
import { MenuService } from 'src/app/services/menu.service';
import { MySocketIo } from 'src/app/utils/my-socket-io';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { LayoutsService } from '../../layouts.service';

const animationParams = {
  menuWidth: '170px',
  duration: '200ms',
};
@Component({
  selector: 'app-d-page',
  templateUrl: './d-page.component.html',
  styleUrls: ['./d-page.component.scss'],
  animations: [
    trigger('sideBar', [
      transition(
        ':enter',
        useAnimation(SideBarOpenAnimation, { params: { ...animationParams } })
      ),
      transition(
        ':leave',
        useAnimation(SideBarCloseAnimation, { params: { ...animationParams } })
      ),
    ]),
  ],
})
export class DPageComponent implements OnInit {
  constructor(
    private router: Router,
    private menuService: MenuService,
    private auth: AuthApiService,
    private loading: LoadingService,
    private mySocket: MySocketIo
  ) {}
  showIndex = 0;
  mainMenuSelect = '';

  showSideBar = true;
  menus: IMenu[] = [];

  private onLoading = false;

  private subs = new SubSink();
  ngOnInit(): void {
    const authExpired = localStorage.getItem('auth-expired');
    if (!authExpired) this.router.navigate(['/login']);
    var datetoday = new Date();
    var expiredDay = new Date(authExpired!);
    if (datetoday.getTime() < expiredDay.getTime()) {
      this.mySocket.connect();
      this.menus = this.menuService.menus;
      const url = this.router.url.split('/');

      this.mainMenuSelect =
        this.menus.find((m) => m.MenuUrl.replace('/', '') === url[1])
          ?.MenuDisplayName ?? '';

      this.subs.sink = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const url = this.router.url.split('/');
          this.mainMenuSelect =
            this.menus.find((m) => m.MenuUrl.replace('/', '') === url[1])
              ?.MenuDisplayName || '';
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  mainMenu() {
    return this.menus.filter((menu) => menu.ParentId === 0 && menu.IsViewPaged);
  }

  subMenu(index: number) {
    return this.menus.filter((menu) => menu.ParentId === index);
  }

  signOut() {
    if (this.onLoading) return;
    this.onLoading = true;
    this.loading.setLoading = true;
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-expired');
    this.subs.sink = this.auth.logout().subscribe({
      next: (_) => {
        this.loading.setLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.loading.setLoading = false;
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
