import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MockApiService } from 'src/app/services/mock-api.service';
import { IRide } from 'src/app/models/ride';
import { ISearchItem } from 'src/app/models/search-item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchControl = new FormControl('');
  rides: IRide[] = [];
  rideDestinations: string[] = [];
  searchList: ISearchItem[] = [];
  filteredRideDestinations: Observable<string[]>;
  filteredSearchList: Observable<ISearchItem[]>;

  constructor(private mockApiService: MockApiService, private dataService: DataService) {
    this.mockApiService.getSearchHistory().subscribe({
      next: (searchItems) => {
        this.filteredSearchList = this.searchControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterSearchItems(value || ''))
        );
        this.searchList = searchItems;
      },
    });
    this.dataService.getRides().subscribe({
      next: (rides) => {
        this.rides = rides;
        rides.forEach((ride) => {
          if (!this.rideDestinations.includes(ride.destination)) this.rideDestinations.push(ride.destination);
        });
        this.filteredRideDestinations = this.searchControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterRideDestinations(value || ''))
        );
      },
    });
  }

  private _filterSearchItems(value: string): ISearchItem[] {
    const filterValue = value.toLowerCase();
    return this.searchList.filter((opt) => opt.search.toLowerCase().includes(filterValue));
  }

  private _filterRideDestinations(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.rideDestinations.filter((opt) => opt.toLowerCase().includes(filterValue));
  }
}
