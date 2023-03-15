import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRide } from '../models/ride';
import { ISearch } from '../models/search';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  constructor(private http: HttpClient) {}

  auth(): Observable<IUser> {
    return this.http.get<IUser>('../assets/mock-data/login.json');
  }

  getRides(): Observable<IRide[]> {
    return this.http.get<IRide[]>('../assets/mock-data/rides.json');
  }

  getPassengerRides(): Observable<IRide[]> {
    return this.http.get<IRide[]>('../assets/mock-data/passenger-rides.json');
  }

  getDriverRides(): Observable<IRide[]> {
    return this.http.get<IRide[]>('../assets/mock-data/driver-rides.json');
  }

  getSearchHistory(): Observable<ISearch[]> {
    return this.http.get<ISearch[]>('../assets/mock-data/search-history.json');
  }
}
