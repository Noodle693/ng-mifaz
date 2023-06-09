import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-mail',
  templateUrl: './update-mail.component.html',
  styleUrls: ['../shared.css'],
})
export class UpdateMailComponent {
  user: IUser;
  updateMailForm = new FormGroup({
    currentMail: new FormControl('', [Validators.required, Validators.email]),
    newMail: new FormControl('', [Validators.required, Validators.email]),
    newMailConfirmation: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private dataService: DataService,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private router: Router,
    private auth: AuthService
  ) {
    this.dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  onSubmit() {
    if (this.updateMailForm.valid) {
      let values = this.updateMailForm.value;
      if (values.newMail !== values.newMailConfirmation) {
        this.snackbar.open('E-Mail Adressen stimmen nicht überein, erneut versuchen.', 'Schließen');
      } else {
        let values = this.updateMailForm.value;
        let toUpdate = { ...this.user };
        toUpdate.mail = values.newMail!;
        this.api.updateUser(toUpdate, '', false).subscribe({
          next: () => {
            this.api.authenticate(values.newMail!, this.auth.password).subscribe({
              next: (response: any) => {
                if (response.user) {
                  this.api.saveAuthenticatedData(values.newMail!, this.auth.password);
                  this.auth.mail = values.newMail!;
                  this.dataService.setUser(response.user);
                }
              },
              complete: () => {
                this.snackbar.open('E-Mail Adresse wurde erfolgreich geändert.', 'Schließen');
                this.router.navigate(['/settings']);
              },
            });
          },
          error: () => this.snackbar.open('Ein Fehler ist aufgetreten. Versuchen Sie es erneut.', 'Schließen'),
        });
      }
    }
  }
}
