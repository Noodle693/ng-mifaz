import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../common/shared.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private mockApiService: MockApiService,
    private dataService: DataService
  ) {}

  onSubmit() {
    console.log(this.loginForm.value);
    this.mockApiService.auth().subscribe({
      next: (user) => this.dataService.setUser(user),
    });
    this.router.navigate(['/mode-selection']);
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  onForgotClick() {
    this.router.navigate(['/reset-password']);
  }
}
