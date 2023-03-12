import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DataService } from './services/data.service';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'mifaz-ui';
  currentRoute: string = '';
  @ViewChild('drawer') public drawer: MatDrawer;

  constructor(router: Router, private drawerService: DrawerService, dataService: DataService) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      dataService.setCurrentRoute(event.url);
      this.currentRoute = event.url;
    });
  }

  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }
}
