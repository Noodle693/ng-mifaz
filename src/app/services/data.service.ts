import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRide } from '../models/ride';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentRoute: BehaviorSubject<string> = new BehaviorSubject<string>('');
  user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    firstName: 'Melissa',
    lastName: 'Stahl',
    phone: '015135315319',
    mail: 'whatever@whatever.com',
  } as IUser);
  rides: BehaviorSubject<IRide[]> = new BehaviorSubject<IRide[]>([]);
  clickedRide: BehaviorSubject<IRide> = new BehaviorSubject<IRide>({
    driverFirstName: 'Melissa',
    driverLastName: 'Stahl',
    origin: 'Testort',
    destination: 'Anderer-Testort',
    date: new Date().toLocaleString(),
    passengerCount: 1,
    maxCount: 3,
    cost: 10,
  } as IRide);
  rideDetailOrigin: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  getCurrentRoute(): Observable<string> {
    return this.currentRoute.asObservable();
  }

  setCurrentRoute(route: string): void {
    this.currentRoute.next(route);
  }

  getUser(): Observable<IUser> {
    return this.user.asObservable();
  }

  setUser(user: IUser): void {
    this.user.next(user);
  }

  getRides(): Observable<IRide[]> {
    return this.rides.asObservable();
  }

  filterRides(value: string): void {
    let tmp = this.rides.value;
    this.setRides(
      tmp.filter((r) => r.destination.toLowerCase().includes(value) || r.origin.toLowerCase().includes(value))
    );
  }

  setRides(rides: IRide[]): void {
    this.rides.next(rides);
  }

  getClickedRide(): Observable<IRide> {
    return this.clickedRide.asObservable();
  }

  setClickedRide(ride: IRide): void {
    this.clickedRide.next(ride);
  }

  getRideDetailOrigin(): Observable<string> {
    return this.rideDetailOrigin.asObservable();
  }

  setRideDetailOrigin(origin: string): void {
    this.rideDetailOrigin.next(origin);
  }
}
