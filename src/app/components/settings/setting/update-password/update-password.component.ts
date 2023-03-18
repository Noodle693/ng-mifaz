import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['../shared.css'],
})
export class UpdatePasswordComponent {
  user: IUser;
  updatePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPasswordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private dataService: DataService,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  onSubmit() {
    if (this.updatePasswordForm.valid) {
      let values = this.updatePasswordForm.value;
      if (values.newPassword !== values.newPasswordConfirmation) {
        this.snackbar.open('Passwörter stimmen nicht überein, erneut versuchen.', 'Schließen');
      } else {
        let values = this.updatePasswordForm.value;
        this.api.updateUser(this.user, values.newPassword!, true).subscribe({
          next: (response) => {
            let u = this.user;
            u.mail = response.mail;
            u.firstName = response.firstName;
            u.lastName = response.lastName;
            u.phone = response.phone;
            this.dataService.setUser(u);
          },
          error: () => this.snackbar.open('Ein Fehler ist aufgetreten. Versuchen Sie es erneut.', 'Schließen'),
          complete: () => {
            this.snackbar.open('Password wurde erfolgreich geändert.', 'Schließen');
            this.router.navigate(['/settings']);
          },
        });
      }
    }
  }
}
