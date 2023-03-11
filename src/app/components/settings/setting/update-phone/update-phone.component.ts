import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(dataService: DataService) {
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  onSubmit() {}
}
