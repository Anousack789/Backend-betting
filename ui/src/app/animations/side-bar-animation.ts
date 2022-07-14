import { animate, animation, style } from "@angular/animations";

export const SideBarOpenAnimation = animation([
  style({ minWidth: '0' }),
  animate('{{duration}}', style({ minWidth: '{{menuWidth}}' })),
]);
export const SideBarCloseAnimation = animation([
  //style({ width: '{{menuWidth}}' }),
  animate('{{duration}}', style({ minWidth: '0px' })),
]);
