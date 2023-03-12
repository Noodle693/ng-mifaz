import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/models/user';
import { IRide } from 'src/app/models/ride';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-rides',
  templateUrl: './user-rides.component.html',
  styleUrls: ['./user-rides.component.css'],
})
export class UserRidesComponent {
  user: IUser = {} as IUser;
  passengerRides: IRide[] = [];
  driverRides: IRide[] = [];

  constructor(private dataService: DataService, api: ApiService) {
    this.dataService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        api.getPersonRides(user.id, false).subscribe({
          next: (response) => {
            if (response.rides.length > 0) {
              this.passengerRides = response.rides;
            }
          },
        });
        api.getPersonRides(user.id, true).subscribe({
          next: (response) => {
            if (response.rides.length > 0) {
              this.driverRides = response.rides;
            }
          },
        });
      },
    });
  }
}
