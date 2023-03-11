import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../common/shared.css'],
})
export class ResetPasswordComponent {
  resetForm = new FormGroup({
    mail: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log(this.resetForm.value);
  }
}
