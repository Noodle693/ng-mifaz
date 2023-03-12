import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICreateRideRequest } from 'src/app/models/api/createRidesRequest';
import { IUser } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ride-creation',
  templateUrl: './ride-creation.component.html',
  styleUrls: ['./ride-creation.component.css'],
})
export class RideCreationComponent {
  rideCreationForm = new FormGroup({
    origin: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    date: new FormControl('', Validators.required),
    time: new FormControl('', [Validators.required]),
    maxCount: new FormControl(0, [Validators.required, Validators.max(4)]),
    cost: new FormControl(0, [Validators.required]),
  });
  selected: Date;
  user: IUser;

  constructor(
    private router: Router,
    private api: ApiService,
    dataService: DataService,
    private _snackbar: MatSnackBar
  ) {
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  onSubmit() {
    if (this.rideCreationForm.valid) {
      let values = this.rideCreationForm.value;
      let date = new Date(values.date!);
      let s = values.time!.split(':');
      date.setHours(parseInt(s[0]) + 2);
      date.setMinutes(parseInt(s[1]));
      console.log(date);
      this.api
        .createRide({
          driverId: this.user.id,
          origin: values.origin!,
          destination: values.destination!,
          date: date,
          maxCount: values.maxCount!,
          cost: values.cost!,
        } as ICreateRideRequest)
        .subscribe({
          next: (createdRide) => {
            if (createdRide) {
              this._snackbar.open('Fahrt erfolgreich angelegt.', 'Schließen');
            }
          },
        });
      this.router.navigate(['/user-rides']);
    }
  }
}
