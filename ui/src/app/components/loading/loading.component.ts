import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { delay, of, switchMap, timer } from 'rxjs';
import {
  LoadingCloseAnimation,
  LoadingOpenAnimation,
} from 'src/app/animations/loading-animation';
import { LoadingService } from 'src/app/services/loading.service';

const animationParams = {
  duration: '300ms',
};
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('loadingAnimation', [
      transition(
        ':enter',
        useAnimation(LoadingOpenAnimation, { params: { ...animationParams } })
      ),
      transition(
        ':leave',
        useAnimation(LoadingCloseAnimation, { params: { ...animationParams } })
      ),
    ]),
  ],
})
export class LoadingComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}
  isLoading = false;
  ngOnInit() {
    this.loadingService._isLoading
      .pipe(
        switchMap((res) => {
          return of(res).pipe(delay(res ? 0 : 1000));
        })
      )
      .subscribe((res) => {
        this.isLoading = res;
      });
  }
}
