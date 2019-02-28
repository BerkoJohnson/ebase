import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Announcer } from './announcer';

interface Token {
  token: string;
}

interface TokenPayload {
  id: string;
  access: string;
  iat: string;
  exp: string;
}

@Injectable()
export class AuthService {
  currentUserSubject: BehaviorSubject<TokenPayload>;
  // currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private announcer: Announcer
  ) {
    this.currentUserSubject = new BehaviorSubject<TokenPayload>(
      this.getToken()
    );
  }

  get currentUser() {
    return this.currentUserSubject.getValue();
  }

  get token() {
    if (!localStorage.getItem('currentUser')) {
      return null;
    }
    return localStorage.getItem('currentUser');
  }

  login(email: string, password: string) {
    // @ts-ignore
    return (
      this.http
        // tslint:disable-next-line:quotemark
        .post(
          '/api/v1/login',
          { email, password },
          { observe: 'response' }
        )
        .pipe(
          map(user => {
            if (user && user.headers.has('x-auth')) {
              localStorage.setItem('currentUser', user.headers.get('x-auth'));
              console.log(this.decodeToken(user.headers.get('x-auth')));
            }
            return user.body;
          })
        )
    );
  }

  decodeToken(token: string = null): TokenPayload {
    return JSON.parse(window.atob(token.split('.')[1]));
  }

  getToken(): TokenPayload {
    if (!this.token) {
      return null;
    }
    return this.decodeToken(this.token);
  }

  checkToken(): boolean {
    const user = this.getToken();

    if (user) {
      const date = new Date();
      // @ts-ignore
      const currentDate = parseInt(date.getTime() / 1000, 10);
      console.log(currentDate, 'iat', user.iat);
      // return +user.exp > currentDate;
    }
    return false;
  }

  logout() {
    const token = localStorage.getItem('currentUser');
    this.http.delete('/api/v1/users/me/token', {
      headers: {
        'x-auth': token
      },
      observe: 'response'
    })
    .pipe(
      tap(x => {
        return console.log(x);
      }, e => {
        return console.error(e);
      })
    );

    window.localStorage.removeItem('currentUser');
    this.announcer.send(null);
    this.router.navigateByUrl('/login');
  }
}
