import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IRide } from 'src/app/models/ride';

@Component({
  selector: 'app-ride-item',
  templateUrl: './ride-item.component.html',
  styleUrls: ['./ride-item.component.css'],
})
export class RideItemComponent {
  @Input() ride: IRide;
  @Input() rideDetailOrigin: string;
  @Input() userType: string;

  constructor(private router: Router, private dataService: DataService) {}

  onClickNavigate() {
    this.dataService.setClickedRide(this.ride);
    this.dataService.setRideDetailOrigin(this.rideDetailOrigin);
    this.router.navigate(['/ride-detail'], { queryParams: { userType: this.userType } });
  }
}
