import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/models/user';

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

  constructor(dataService: DataService) {
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  onSubmit() {}
}
