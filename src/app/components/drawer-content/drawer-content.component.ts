import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.css'],
})
export class DrawerContentComponent {
  user: IUser;
  currentRoute: string;

  constructor(
    dataService: DataService,
    private router: Router,
    private drawerService: DrawerService
  ) {
    dataService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
    dataService.getCurrentRoute().subscribe({
      next: (route) => (this.currentRoute = route),
    });
  }

  navigate(destination: string) {
    this.router.navigate([destination]);
    this.drawerService.toggle();
  }
}
