import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  mail: string;
  password: string;
  isLoggedIn: boolean = false;

  constructor() {}

  saveAuth(m: string, p: string) {
    this.mail = m;
    this.password = p;
    this.isLoggedIn = true;
  }

  deleteAuth() {
    this.isLoggedIn = false;
  }

  getAuth() {
    return this.isLoggedIn;
  }
}
