import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ICreateRideRequest } from 'src/app/models/api/create-ride-request';
import { IUser } from 'src/app/models/user';

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
    time: new FormControl('', [Validators.required]),
    maxCount: new FormControl('', [Validators.required, Validators.max(4)]),
    cost: new FormControl('', [Validators.required]),
  });
  selected: Date;
  user: IUser;
  today = new Date();

  constructor(
    private router: Router,
    private api: ApiService,
    private snackbar: MatSnackBar,
    dataService: DataService,
    route: ActivatedRoute
  ) {
    route.queryParams.subscribe({
      next: (params) => {
        this.rideCreationForm.controls.destination.setValue(params['destination']);
      },
    });
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  onSubmit() {
    if (this.rideCreationForm.valid) {
      let values = this.rideCreationForm.value;
      let date = new Date(values.date!);
      let s = values.time!.split(':');
      let hrs = parseInt(s[0]);
      date.setHours(hrs + 2);
      date.setMinutes(parseInt(s[1]));
      this.api
        .createRide({
          driverId: this.user.id,
          origin: values.origin!,
          destination: values.destination!,
          date: date,
          maxCount: parseInt(values.maxCount!),
          cost: parseInt(values.cost!),
        } as ICreateRideRequest)
        .subscribe({
          next: (createdRide) => {
            if (createdRide) {
              this.snackbar.open('Fahrt erfolgreich angelegt.', 'Schließen');
              this.router.navigate(['/user-rides']);
            }
          },
        });
    }
  }
}
