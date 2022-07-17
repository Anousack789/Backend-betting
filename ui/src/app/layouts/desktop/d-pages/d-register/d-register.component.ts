import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control?.touched && form?.hasError('notSame') ? true : false;
  }
}

@Component({
  selector: 'app-d-register',
  templateUrl: './d-register.component.html',
  styleUrls: ['./d-register.component.scss'],
})
export class DRegisterComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.registerForm = this.fb.group(
      {
        token: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        firstName: [''],
        lastName: [''],
        contactNo: [''],
        birthDate: [''],
        gender: ['0'],
        terms: [false],
      },
      {
        validators: this.checkPasswords,
      }
    );
  }

  @ViewChild('inputPassword') password: any;
  @ViewChild('inputConfirmPassword') confirmPassword: any;

  private subs = new SubSink();

  registerForm: FormGroup | undefined;

  showPassword = false;
  showConfirmPassword = false;

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params['token']) {
      this.registerForm?.patchValue({
        token: params['token'],
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    console.log(this.registerForm?.value);
  }

  getErrorMessage(control: string) {
    switch (control) {
      case 'token':
        return this.registerForm?.controls['token'].hasError('required')
          ? 'You must enter a value'
          : '';
      case 'userName':
        return this.registerForm?.controls['userName'].hasError('required')
          ? 'You must enter a value'
          : '';
      case 'email':
        return this.registerForm?.controls['email'].hasError('required')
          ? 'You must enter a value'
          : this.registerForm?.controls['email'].hasError('email')
          ? 'Not a valid email'
          : '';
      case 'password':
        return this.registerForm?.controls['password'].hasError('required')
          ? 'You must enter a value'
          : this.registerForm?.controls['password'].hasError('minlength')
          ? 'Password must be at least 6 characters long'
          : '';
      case 'confirmPassword':
        const confirm = this.registerForm?.controls['confirmPassword'];
        const pass = this.registerForm?.controls['password'];
        return confirm?.hasError('required')
          ? 'You must enter a value'
          : confirm?.hasError('minlength')
          ? 'Password must be at least 6 characters long'
          : pass?.value !== confirm?.value
          ? 'Passwords do not match'
          : '';
      default:
        return '';
    }
  }

  hidePassFunc() {
    this.showPassword = !this.showPassword;
    this.renderer.setProperty(
      this.password.nativeElement,
      'type',
      this.showPassword ? 'text' : 'password'
    );
  }

  hideConfirmPassFunc() {
    this.showConfirmPassword = !this.showConfirmPassword;

    this.renderer.setProperty(
      this.confirmPassword.nativeElement,
      'type',
      this.showConfirmPassword ? 'text' : 'password'
    );
  }
}
