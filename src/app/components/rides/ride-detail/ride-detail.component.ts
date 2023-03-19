import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CancellationConfirmationDialog } from './cancellation-confirmation-dialog';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { IRide } from 'src/app/models/ride';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-ride-item-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css'],
})
export class RideDetailComponent {
  origin: string;
  user: IUser;
  ride: IRide;
  userType: string;

  constructor(
    dataService: DataService,
    route: ActivatedRoute,
    private dialog: MatDialog,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    dataService.getClickedRide().subscribe({
      next: (ride) => (this.ride = ride),
    });
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
    dataService.getRideDetailOrigin().subscribe({
      next: (origin) => (this.origin = origin),
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

  onBooking() {
    this.api.createRideBooking({ rideId: this.ride.rideId, passengerId: this.user.id }).subscribe({
      next: (response) => {
        if (response.rideBooking) {
          this.snackbar.open('Fahrt erfolgreich gebucht.', 'Schließen');
        }
      },
      error: () => this.snackbar.open('Ein Fehler ist aufgetreten. Versuchen Sie es erneut.', 'Schließen'),
      complete: () => {
        this.router.navigate(['/ride-overview']);
      },
    });
  }
}
