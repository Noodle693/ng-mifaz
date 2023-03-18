import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../common/shared.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private router: Router, private api: ApiService, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.registerForm.valid) {
      let values = this.registerForm.value;
      if (values.password !== values.passwordConfirmation) {
        this.snackBar.open('Passwörter stimmen nicht überein, erneut versuchen.', 'Schließen');
      } else {
        this.api
          .createUser({
            mail: values.mail!,
            password: values.password!,
            firstName: values.firstName!,
            lastName: values.lastName!,
            phone: values.phone!,
          })
          .subscribe({
            next: (user) => {
              if (user) {
                this.snackBar.open('Erfolgreich registriert, bitte zum Login wechseln.', 'Schließen');
              }
            },
          });
      }
    }
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
