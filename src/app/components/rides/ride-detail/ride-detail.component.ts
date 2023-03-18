import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CancellationConfirmationDialog } from './cancellation-confirmation-dialog';
import { DataService } from 'src/app/services/data.service';
import { IRide } from 'src/app/models/ride';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-ride-item-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css'],
})
export class RideDetailComponent {
  user: IUser;
  ride: IRide;
  userType: string;

  constructor(dataService: DataService, route: ActivatedRoute, private dialog: MatDialog) {
    dataService.getClickedRide().subscribe({
      next: (ride) => (this.ride = ride),
    });
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
    route.queryParams.subscribe({
      next: (params) => {
        this.userType = params['userType'];
      },
    });
  }

  onCancellation() {
    this.dialog.open(CancellationConfirmationDialog, {
      data: { userType: this.userType, rideId: this.ride.rideId, userId: this.user.id },
    });
  }
}
