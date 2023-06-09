import { Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IRide } from 'src/app/models/ride';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ride-overview',
  templateUrl: './ride-overview.component.html',
  styleUrls: ['./ride-overview.component.css'],
})
export class RideOverviewComponent implements OnDestroy {
  rides: IRide[] = [];

  constructor(api: ApiService, private dataService: DataService) {
    dataService.getRides().subscribe({
      next: (rides) => {
        if (rides.length == 0) {
          api.getRides().subscribe({
            next: (response) => {
              if (response.rides.length > 0) {
                this.rides = response.rides;
                this.dataService.setRides(response.rides);
              }
            },
          });
        } else {
          this.rides = rides;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.dataService.setRides([]);
  }
}
