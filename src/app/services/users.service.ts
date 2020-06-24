import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userNameList = [];
  errorMessage: string;
  warning: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): any {
    let headers = new HttpHeaders();
    headers = headers.set(
      'authorization',
      localStorage.getItem('topShelf_token')
    );
    return this.http.get('/api/users', { headers });
  }

  addNewUser(formValue) {
    this.http
      .post<{ message: string; goodToGo: boolean; token }>(
        '/api/users/register',
        formValue
      )
      .subscribe((response) => {
        if (!response.goodToGo) {
          this.errorMessage = response.message;
          // console.log(this.errorMessage);
          this.warning = response.goodToGo;
          // console.log(this.warning);
        } else {
          // console.log(response.message);
          console.log(response.token);
          localStorage.setItem('token', response.token);

          this.router.navigate(['/the-feed']);
        }
      });
  }

  login(formValue) {
    this.http
      .post<{
        message: string;
        goodToGo: boolean;
        user: any;
        token: any;
      }>('api/users/login', formValue)
      .subscribe((response) => {
        // console.log('service', response.user);
        if (!response.goodToGo) {
          // console.log(response.goodToGo);

          console.log(response.message);
        } else {
          console.log(response.message);
          localStorage.setItem('token', response.token);

          this.router.navigate(['/the-feed']);
        }
      });
  }

  loggedIn() {
    // looks for token in local storage
    // returns true/false
    return !!localStorage.getItem('token');
  }

  logOutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  PasswordValidation(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      // get the passwords from the controls
      const passwordControl = formGroup.controls[password];
      const password2Control = formGroup.controls[password2];

      if (!passwordControl || !password2Control) {
        return null;
      }

      if (
        password2Control.errors &&
        !password2Control.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== password2Control.value) {
        password2Control.setErrors({ passwordMismatch: true });
      } else {
        password2Control.setErrors(null);
      }
    };
  }
}
