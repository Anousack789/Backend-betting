import { Routes } from '@angular/router';
import { LayoutsService } from './layouts.service';

export function LayoutsRoutingModule(layoutsService: LayoutsService) {
  if (layoutsService.isMobile()) {
    return [
      {
        path: '',
        loadChildren: () =>
          import('./mobile/mobile.module').then((m) => m.MobileModule),
      },
    ];
  } else {
    return [
      {
        path: '',
        loadChildren: () =>
          import('./desktop/desktop.module').then((m) => m.DesktopModule),
      },
    ];
  }
}
