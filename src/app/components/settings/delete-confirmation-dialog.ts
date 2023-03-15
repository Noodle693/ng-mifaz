import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: 'delete-confirmation-dialog.html',
  styleUrls: ['./settings.component.css'],
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  onYesClick(): void {
    this.api.deleteUser(this.data.userId).subscribe({
      next: () => {
        this.snackbar.open('Nutzer wurde erfolgreich gelöscht.', 'Schließen');
        this.auth.deleteAuth();
        this.router.navigate(['/login']);
        this.dialogRef.close();
      },
      error: (err) => this.snackbar.open('Ein Fehler ist aufgetreten. Versuchen Sie es erneut.', 'Schließen'),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
