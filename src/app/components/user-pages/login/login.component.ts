import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

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
    private api: ApiService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      let values = this.loginForm.value;
      this.api.authenticate(values.mail!, values.password!).subscribe({
        next: (user: any) => {
          if (user.user) {
            this.auth.saveAuth(values.mail!, values.password!);
            this.api.saveAuthenticatedData(values.mail!, values.password!);
            this.dataService.setUser(user.user);
            this.router.navigate(['/mode-selection']);
          } else {
            this.snackBar.open('Daten fehlerhaft, versuchen sie es erneut.', 'Schließen');
          }
        },
        error: (e) => this.snackBar.open('Daten fehlerhaft, versuchen sie es erneut.', 'Schließen'),
      });
    }
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  onForgotClick() {
    this.router.navigate(['/reset-password']);
  }
}
