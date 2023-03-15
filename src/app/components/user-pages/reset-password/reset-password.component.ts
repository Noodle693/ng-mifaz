import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../common/shared.css'],
})
export class ResetPasswordComponent {
  resetForm = new FormGroup({
    mail: new FormControl('', [Validators.required]),
  });

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.resetForm.valid) {
      let values = this.resetForm.value;
      this.api.resetPassword(values.mail!).subscribe({
        next: (result: any) => {
          if (result.result) {
            this.snackBar.open('Passwort erfolgreich auf "default" zurückgesetzt.', 'Schließen');
          } else {
            this.snackBar.open('E-Mail Adresse nicht gefunden.', 'Schließen');
          }
        },
      });
    }
  }
}
