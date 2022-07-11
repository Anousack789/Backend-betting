import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MyCryptoService } from 'src/app/services/my-crypto.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-d-login',
  templateUrl: './d-login.component.html',
  styleUrls: ['./d-login.component.scss'],
})
export class DLoginComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private myCrypto: MyCryptoService
  ) {}

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  private subs = new SubSink();

  private onLoading = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid && !this.onLoading) {
      this.onLoading = true;
      const { userName, password } = this.loginForm.value;
      this.subs.sink = this.authService.login(userName!, password!).subscribe({
        next: (res) => {
          this.onLoading = false;
          let decryptMenu = this.myCrypto.decrypt(res.token);
          const myJson = JSON.parse(decryptMenu);
          console.log(myJson);
          localStorage.setItem('auth-token', res.token);
          localStorage.setItem('auth-expired', res.expiredIn);
          //this.router.navigate(['/dashboard'])
        },
        error: (err) => {
          this.onLoading = false;
          Swal.fire({
            icon: 'error',
            text: err.message ?? 'Something Wrong!!',
          });
        },
      });
    }
  }
  getErrorMessage(controlName: string) {
    if (controlName == 'userName') {
      if (this.loginForm.controls.userName.hasError('required')) {
        return 'You must enter a value';
      }
      return '';
    } else {
      if (this.loginForm.controls.password.hasError('required')) {
        return 'You must enter a value';
      }
      return '';
    }
  }
}
