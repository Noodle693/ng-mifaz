import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MockApiService } from 'src/app/services/mock-api.service';
import { IRide } from 'src/app/models/ride';

@Component({
  selector: 'app-ride-overview',
  templateUrl: './ride-overview.component.html',
  styleUrls: ['./ride-overview.component.css'],
})
export class RideOverviewComponent {
  rides: IRide[] = [];

  constructor(
    private mockApiService: MockApiService,
    private dataService: DataService
  ) {
    this.mockApiService.getRides().subscribe({
      next: (rides) => {
        this.rides = rides;
        this.dataService.setRides(rides);
      },
    });
  }
}
