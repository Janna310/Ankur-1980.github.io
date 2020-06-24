import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { extractError } from '../helpers/functions';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../interfaces/login';
import * as moment from 'moment';
import { Router } from '@angular/router';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = '';
  sub: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  decodedToken: DecodedToken;
  redirectUrl: string;
  private topShelfToken = new BehaviorSubject<any>('');
  public sharedToken: Observable<string> = this.topShelfToken.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.decodedToken = new DecodedToken();
  }

  register(formData): Observable<any> {
    return this.http
      .post('/api/users/register', formData)
      .pipe(
        catchError((resError: HttpErrorResponse) =>
          throwError(extractError(resError))
        )
      );
  }

  login(formData: any) {
    return this.http.post('/api/users/login', formData).pipe(
      map((data: Login) => {
        this.saveToken(data.token);
        return data.token;
      }),
      catchError((resError: HttpErrorResponse) =>
        throwError(extractError(resError))
      )
    );
  }

  logOut() {
    localStorage.removeItem('topShelf_token');
    this.decodedToken = new DecodedToken();
    this.topShelfToken.next('');
    this.router.navigate(['/login'], {
      queryParams: { message: 'You are logged out' },
    });
  }

  checkAuth(): boolean {
    const authToken = localStorage.getItem('topShelf_token');
    if (!authToken) {
      return false;
    } else {
      this.topShelfToken.next(authToken);
    }
    const decodedToken = jwt.decodeToken(authToken);
    if (!decodedToken) {
      return false;
    }

    this.decodedToken = decodedToken;

    return true;
  }

  private saveToken(token: string): string | null {
    const decodedToken = jwt.decodeToken(token);
    if (!decodedToken) {
      return null;
    }

    this.decodedToken = decodedToken;
    localStorage.setItem('topShelf_token', token);
    this.topShelfToken.next(token);
    // console.log('decoded token', this.decodedToken);

    return token;
  }

  // gets the username from the encoded token
  get username(): string {
    return this.decodedToken.username;
  }

  // gets userID from the encoded token
  get userID(): string {
    return this.decodedToken.sub;
  }

  // checks to see if token expiration is before current time
  get isAuthenticated(): boolean {
    return moment().isBefore(this.expiration);
  }

  private get expiration() {
    return moment.unix(this.decodedToken.exp);
  }
}
