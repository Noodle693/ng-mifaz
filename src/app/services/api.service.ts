import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { IGetRidesResponse } from '../models/api/getRidesResponse';
import { ICreateRideRequest } from '../models/api/createRidesRequest';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'https://mifaz-exfu2xru2a-ew.a.run.app';
  header: {};

  constructor(private http: HttpClient) {}

  authenticate(mail: string, password: string): Observable<IUser> {
    let ep = `${this.url}/Users/authenticate`;
    return this.http.post<IUser>(ep, { mail: mail, password: password });
  }

  saveAuthenticatedData(mail: string, password: string): void {
    this.header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + window.btoa(`${mail}:${password}`),
      }),
    };
  }

  createUser(mail: string, password: string, firstName: string, lastName: string, phone: string): Observable<IUser> {
    let ep = `${this.url}/Users/create`;
    return this.http.post<IUser>(ep, {
      mail: mail,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });
  }

  resetPassword(mail: string): Observable<any> {
    let ep = `${this.url}/Users/reset`;
    return this.http.post<any>(ep, { mail: mail });
  }

  getRides(): Observable<IGetRidesResponse> {
    let ep = `${this.url}/Rides`;
    return this.http.get<IGetRidesResponse>(ep, this.header);
  }

  getPersonRides(personId: number, isDriver: boolean): Observable<IGetRidesResponse> {
    let ep = `${this.url}/Rides/${personId}?isDriver=${isDriver}`;
    return this.http.get<IGetRidesResponse>(ep, this.header);
  }

  createRide(request: ICreateRideRequest): Observable<ICreateRideRequest> {
    let ep = `${this.url}/Rides/create`;
    return this.http.post<ICreateRideRequest>(ep, request, this.header);
  }

  //   getSearchHistory(): Observable<ISearchItem[]> {}
}
