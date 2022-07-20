import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/apis/auth-api.service';
import { MenuService } from 'src/app/services/menu.service';
import { MyCryptoService } from 'src/app/services/my-crypto.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-d-login',
  templateUrl: './d-login.component.html',
  styleUrls: ['./d-login.component.scss'],
})
export class DLoginComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authService: AuthApiService,
    private router: Router,
    private myCrypto: MyCryptoService,
    private menuService: MenuService,
    private loading: LoadingService
  ) {}

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberPassword: [false],
  });

  private subs = new SubSink();

  private onLoading = false;

  private rememberPassword = false;

  ngOnInit(): void {
    this.rememberPassword = localStorage.getItem('rememberPassword') == 'true';
    if (this.rememberPassword) {
      const remember = localStorage.getItem('remember');
      if (remember) {
        const rememberDecrypted = this.myCrypto.decrypt(remember);
        const rememberJson = JSON.parse(rememberDecrypted);
        this.loginForm.patchValue({
          ...rememberJson,
          rememberPassword: this.rememberPassword,
        });
      } else {
        this.loginForm.patchValue({ rememberPassword: this.rememberPassword });
      }
    }
    this.subs.sink =
      this.loginForm.controls.rememberPassword.valueChanges.subscribe({
        next: (res) => {
          if (res) {
            localStorage.setItem('rememberPassword', 'true');
          } else {
            localStorage.setItem('rememberPassword', 'false');
          }
        },
        error: (err) => {
          console.error(err);
          this.loading.setLoading = false;

          Swal.fire({
            title: 'Error',
            text: err.message || 'Something went wrong',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid && !this.onLoading) {
      this.onLoading = true;
      const { userName, password } = this.loginForm.value;
      if (this.rememberPassword) {
        const remember = {
          userName,
          password,
        };
        const rememberEncrypted = this.myCrypto.encrypt(
          JSON.stringify(remember)
        );
        localStorage.setItem('remember', rememberEncrypted);
      }
      this.subs.sink = this.authService.login(userName!, password!).subscribe({
        next: (res) => {
          this.onLoading = false;
          let decryptMenu = this.myCrypto.decrypt(res.token);
          const myJson = JSON.parse(decryptMenu);
          this.menuService.menus = myJson;
          localStorage.setItem('auth-token', res.token);
          localStorage.setItem('auth-expired', res.expiresIn);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.onLoading = false;

          Swal.fire({
            title: 'Error',
            text: err.message || 'Something went wrong',
            icon: 'error',
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
