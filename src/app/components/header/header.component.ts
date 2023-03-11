import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerService } from 'src/app/services/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() currentRoute: string = '';

  constructor(private drawerService: DrawerService, private router: Router) {}

  toggleDrawer() {
    this.drawerService.toggle();
  }

  navigateBackToRides() {
    this.router.navigate(['/user-rides']);
  }

  navigateBackToSettings() {
    this.router.navigate(['/settings']);
  }
}
