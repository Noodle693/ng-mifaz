import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'cancellation-confirmation-dialog',
  templateUrl: 'cancellation-confirmation-dialog.html',
  styleUrls: ['../../settings/settings.component.css'],
})
export class CancellationConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<CancellationConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private api: ApiService,
    private router: Router
  ) {}

  onYesClick(): void {
    switch (this.data.userType) {
      case 'passenger':
        this.api.deleteRide(this.data.rideId, false, this.data.userId).subscribe({
          error: () => this.snackbar.open('Ein Fehler ist aufgetreten. Versuchen Sie es erneut.', 'Schließen'),
          complete: () => {
            this.snackbar.open('Mitfahrt wurde erfolgreich abgesagt.', 'Schließen');
            this.router.navigate(['/user-rides']);
            this.dialogRef.close();
          },
        });
        break;
      case 'driver':
        this.api.deleteRide(this.data.rideId, true).subscribe({
          error: () => this.snackbar.open('Ein Fehler ist aufgetreten. Versuchen Sie es erneut.', 'Schließen'),
          complete: () => {
            this.snackbar.open('Fahrt wurde erfolgreich abgesagt.', 'Schließen');
            this.router.navigate(['/user-rides']);
            this.dialogRef.close();
          },
        });
        break;
      default:
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
