import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  user: IUser;

  constructor(dataService: DataService, private router: Router) {
    dataService.getUser().subscribe({
      next: (user) => (this.user = user),
    });
  }

  navigate(destination: string) {
    this.router.navigate([destination]);
  }
}
