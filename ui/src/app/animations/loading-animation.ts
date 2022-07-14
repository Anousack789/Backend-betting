import { animate, animation, style } from '@angular/animations';

export const LoadingOpenAnimation = animation([
  style({ top: '-100px' }),
  animate('{{duration}}', style({ top: '0' })),
]);
export const LoadingCloseAnimation = animation([
  animate('{{duration}}', style({ top: '-100px' })),
]);
