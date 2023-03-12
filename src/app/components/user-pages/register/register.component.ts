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
    password: new FormControl('', [Validators.required]),
    passwordConfirmation: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private api: ApiService, private _snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.registerForm.valid) {
      let values = this.registerForm.value;
      if (values.password !== values.passwordConfirmation) {
        this._snackBar.open('Passwörter stimmen nicht überein, erneut versuchen.', 'Schließen');
      } else {
        this.api
          .createUser(values.mail!, values.password!, values.firstName!, values.lastName!, values.phone!)
          .subscribe({
            next: (user) => {
              if (user) {
                this._snackBar.open('Erfolgreich registriert, bitte zum Login wechseln.', 'Schließen');
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
