import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiError } from 'src/app/interfaces/api-error';
import { Login } from '../../../interfaces/login';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  message: string;
  messageTimeout: number;
  errors: ApiError[] = [];

  constructor(
    private usersService: UsersService,
    private auth: AuthService,
    private fb: FormBuilder,
    public nav: NavbarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginMessage();

    this.nav.hide();
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      loginDate: this.fb.control(new Date()),
    });
  }

  onLogin() {
    // console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }
    this.errors = [];
    return this.auth.login(this.loginForm.value).subscribe(
      () => {
        if (this.auth.redirectUrl) {
          this.router.navigate([this.auth.redirectUrl]);
          this.auth.redirectUrl = null;
        } else {
          this.router.navigate(['/the-feed']);
        }
      },
      (errors: ApiError[]) => {
        this.errors = errors;
      }
    );
  }

  checkLoginMessage() {
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'] ? params['message'] : null;

      this.messageTimeout = window.setTimeout(() => {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: { message: null },
          queryParamsHandling: 'merge',
        });

        this.message = '';
      }, 3000);
    });
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // this doesn't work for some reason
  // get loginFormControl() {
  //   return this.loginForm.controls;
  // }

  ngOnDestroy() {
    this.messageTimeout && window.clearTimeout(this.messageTimeout);
  }
}
