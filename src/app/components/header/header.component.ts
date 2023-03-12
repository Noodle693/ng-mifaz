import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() currentRoute: string = '';
  rideDetailOrigin: string = '';

  constructor(private drawerService: DrawerService, private router: Router, dataService: DataService) {
    dataService.getOrigin().subscribe({
      next: (value) => {
        this.rideDetailOrigin = value;
      },
    });
  }

  toggleDrawer() {
    this.drawerService.toggle();
  }

  navigateBackToRides() {
    if (this.rideDetailOrigin === 'overview') {
      this.router.navigate(['/ride-overview']);
    } else if (this.rideDetailOrigin === 'user-rides') {
      this.router.navigate(['/user-rides']);
    }
  }

  navigateBackToSettings() {
    this.router.navigate(['/settings']);
  }
}
