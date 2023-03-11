import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-creation',
  templateUrl: './ride-creation.component.html',
  styleUrls: ['./ride-creation.component.css'],
})
export class RideCreationComponent {
  rideCreationForm = new FormGroup({
    origin: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    passengerCount: new FormControl('', [
      Validators.required,
      Validators.max(4),
    ]),
    cost: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/user-rides']);
  }
}
