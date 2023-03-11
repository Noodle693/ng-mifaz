import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IRide } from 'src/app/models/ride';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ride-item',
  templateUrl: './ride-item.component.html',
  styleUrls: ['./ride-item.component.css'],
})
export class RideItemComponent {
  @Input() ride: IRide;

  constructor(private router: Router, private dataService: DataService) {}

  onClickNavigate() {
    this.dataService.setClickedRide(this.ride);
    this.router.navigate(['/ride-detail']);
  }
}
