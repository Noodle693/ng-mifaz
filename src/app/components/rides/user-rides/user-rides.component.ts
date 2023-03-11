import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/models/user';
import { MockApiService } from 'src/app/services/mock-api.service';
import { IRide } from 'src/app/models/ride';

@Component({
  selector: 'app-user-rides',
  templateUrl: './user-rides.component.html',
  styleUrls: ['./user-rides.component.css'],
})
export class UserRidesComponent {
  user: IUser = {} as IUser;
  passengerRides: IRide[] = [];
  driverRides: IRide[] = [];

  constructor(
    private dataService: DataService,
    private mockApiService: MockApiService
  ) {
    this.dataService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.mockApiService.getPassengerRides().subscribe({
          next: (rides) => {
            this.passengerRides = rides;
          },
        });
        this.mockApiService.getDriverRides().subscribe({
          next: (rides) => {
            this.driverRides = rides;
          },
        });
      },
    });
  }
}
