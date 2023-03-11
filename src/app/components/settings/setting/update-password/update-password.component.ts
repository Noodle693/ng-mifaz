import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['../shared.css'],
})
export class UpdatePasswordComponent {
  user: IUser;
  updatePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPasswordConfirmation: new FormControl('', [Validators.required]),
  });

  constructor(dataService: DataService) {
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  onSubmit() {}
}
