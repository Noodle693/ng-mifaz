import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  user: IUser;

  constructor(dataService: DataService, private router: Router, private auth: AuthService) {
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  navigate(destination: string) {
    this.router.navigate([destination]);
  }

  logout() {
    this.auth.deleteAuth();
    this.router.navigate(['/login']);
  }
}
