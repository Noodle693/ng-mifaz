import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { IGetRideResponse } from '../models/api/get-ride-response';
import { ICreateRideRequest } from '../models/api/create-ride-request';
import { ICreateUserRequest } from '../models/api/create-user-request';
import { ISearch } from '../models/search';
import { ICreateSearchRequest } from '../models/api/create-search-request';
import { ICreateSearchResponse } from '../models/api/create-search-response';
import { IUpdateUserResponse } from '../models/api/update-user-response';

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

  createUser(request: ICreateUserRequest): Observable<IUser> {
    let ep = `${this.url}/Users/create`;
    return this.http.post<IUser>(ep, request);
  }

  updateUser(user: IUser, password: string, updatePassword: boolean): Observable<IUpdateUserResponse> {
    let ep = `${this.url}/Users/update`;
    return this.http.put<IUpdateUserResponse>(
      ep,
      {
        user: {
          id: user.id,
          mail: user.mail,
          password: password,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        },
        updatePassword: updatePassword,
      },
      this.header
    );
  }

  deleteUser(userId: number): Observable<void> {
    let ep = `${this.url}/Users/${userId}`;
    return this.http.delete<void>(ep, this.header);
  }

  resetPassword(mail: string): Observable<any> {
    let ep = `${this.url}/Users/reset`;
    return this.http.post<any>(ep, { mail: mail });
  }

  getRides(): Observable<IGetRideResponse> {
    let ep = `${this.url}/Rides`;
    return this.http.get<IGetRideResponse>(ep, this.header);
  }

  getPersonRides(personId: number, isDriver: boolean): Observable<IGetRideResponse> {
    let ep = `${this.url}/Rides/${personId}?isDriver=${isDriver}`;
    return this.http.get<IGetRideResponse>(ep, this.header);
  }

  createRide(request: ICreateRideRequest): Observable<ICreateRideRequest> {
    let ep = `${this.url}/Rides/create`;
    return this.http.post<ICreateRideRequest>(ep, request, this.header);
  }

  deleteRide(rideId: number, isDriver: boolean, passengerId?: number): Observable<void> {
    let ep = ``;
    if (passengerId) {
      ep = `${this.url}/Rides/${rideId}?isDriver=${isDriver}&passengerId=${passengerId}`;
    } else {
      ep = `${this.url}/Rides/${rideId}?isDriver=${isDriver}`;
    }
    return this.http.delete<void>(ep, this.header);
  }

  getSearches(userId: number): Observable<ISearch[]> {
    let ep = `${this.url}/Searches/${userId}`;
    return this.http.get<ISearch[]>(ep, this.header);
  }

  createSearch(request: ICreateSearchRequest): Observable<ICreateSearchResponse> {
    let ep = `${this.url}/Searches/create`;
    return this.http.post<ICreateSearchResponse>(ep, request, this.header);
  }

  deleteSearch(userId: number): Observable<void> {
    let ep = `${this.url}/Searches/${userId}`;
    return this.http.delete<void>(ep, this.header);
  }
}
