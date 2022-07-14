import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  SideBarCloseAnimation,
  SideBarOpenAnimation,
} from 'src/app/animations/side-bar-animation';
import { AuthApiService } from 'src/app/apis/auth-api.service';
import { IMenu } from 'src/app/interfaces/i-menu';
import { LoadingService } from 'src/app/services/loading.service';
import { MenuService } from 'src/app/services/menu.service';
import { SubSink } from 'subsink';
import { LayoutsService } from '../layouts.service';

const animationParams = {
  menuWidth: '170px',
  duration: '200ms',
};
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
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
export class DesktopComponent implements OnInit, OnDestroy {
  constructor(
    private layoutsService: LayoutsService,
    private router: Router,
    private menuService: MenuService,
    private auth: AuthApiService,
    private loading: LoadingService
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

  get isMobile() {
    return this.layoutsService.isMobile;
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
        console.log(err);
      },
    });
  }
}
