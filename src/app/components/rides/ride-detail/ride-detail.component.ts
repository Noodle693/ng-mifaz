import { Component } from '@angular/core';
import { IRide } from 'src/app/models/ride';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ride-item-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css'],
})
export class RideDetailComponent {
  ride: IRide;

  constructor(private dataService: DataService) {
    this.dataService.getClickedRide().subscribe({
      next: (ride) => (this.ride = ride),
    });
  }
}
