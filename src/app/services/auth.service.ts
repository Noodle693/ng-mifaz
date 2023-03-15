import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {}

  saveAuth() {
    this.isLoggedIn = true;
  }

  deleteAuth() {
    this.isLoggedIn = false;
  }

  getAuth() {
    return this.isLoggedIn;
  }
}
