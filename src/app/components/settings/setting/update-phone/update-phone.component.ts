import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['../shared.css'],
})
export class UpdatePhoneComponent {
  user: IUser;
  updatePhoneForm = new FormGroup({
    currentPhone: new FormControl('', [Validators.required]),
    newPhone: new FormControl('', [Validators.required]),
    newPhoneConfirmation: new FormControl('', [Validators.required]),
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
    if (this.updatePhoneForm.valid) {
      let values = this.updatePhoneForm.value;
      if (values.newPhone !== values.newPhoneConfirmation) {
        this.snackbar.open('Telefonnummern stimmen nicht überein, erneut versuchen.', 'Schließen');
      } else {
        let values = this.updatePhoneForm.value;
        let toUpdate = { ...this.user };
        toUpdate.phone = values.newPhone!;
        this.api.updateUser(toUpdate, '', false).subscribe({
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
            this.snackbar.open('Telefonnummer wurde erfolgreich geändert.', 'Schließen');
            this.router.navigate(['/settings']);
          },
        });
      }
    }
  }
}
