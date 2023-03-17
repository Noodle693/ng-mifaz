import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { ISearch } from 'src/app/models/search';
import { IRide } from 'src/app/models/ride';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchControl = new FormControl('');
  user: IUser;
  rides: IRide[] = [];
  rideDestinations: string[] = [];
  rideOrigins: string[] = [];
  searchList: ISearch[] = [];
  filteredRides: Observable<string[]>;
  filteredSearchList: Observable<ISearch[]>;

  constructor(private dataService: DataService, private api: ApiService, private router: Router) {
    this.dataService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.api.getSearches(user.id).subscribe({
          next: (result: any) => {
            this.filteredSearchList = this.searchControl.valueChanges.pipe(
              startWith(''),
              map((value) => this._filterSearchItems(value || ''))
            );
            this.searchList = result.searchHistory;
          },
        });
      },
    });
    this.dataService.getRides().subscribe({
      next: (rides) => {
        this.rides = rides;
        rides.forEach((ride) => {
          if (!this.rideDestinations.includes(ride.destination)) this.rideDestinations.push(ride.destination);
          if (!this.rideOrigins.includes(ride.origin)) this.rideOrigins.push(ride.origin);
        });

        this.filteredRides = this.searchControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterRideValues(value || ''))
        );
      },
    });
  }

  applyFilter(filter: string) {
    this.api.createSearch({ userId: this.user.id, value: filter }).subscribe({
      next: (response) => {
        this.searchList[4] = this.searchList[3];
        this.searchList[3] = this.searchList[2];
        this.searchList[2] = this.searchList[1];
        this.searchList[1] = this.searchList[0];
        this.searchList[0] = response.search;
      },
    });
    this.dataService.filterRides(filter.toLowerCase());
  }

  onRideCreation() {
    this.router.navigate(['/ride-creation'], { queryParams: { destination: this.searchControl.value } });
  }

  onCancel() {
    this.searchControl.setValue('');
    this.dataService.setRides([]);
  }

  private _filterSearchItems(value: string): ISearch[] {
    const filterValue = value.toLowerCase();
    return this.searchList.filter((opt) => opt.value.toLowerCase().includes(filterValue));
  }

  private _filterRideValues(value: string): string[] {
    const filterValue = value.toLowerCase();
    let res: string[] = [];
    let tmp: string[] = [];
    this.rideOrigins.forEach((r) => tmp.push(r));
    this.rideDestinations.forEach((r) => {
      if (!tmp.includes(r)) tmp.push(r);
    });
    tmp.filter((r) => r.toLowerCase().includes(filterValue)).forEach((r) => res.push(r));
    return res;
  }
}
