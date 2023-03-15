export interface ICreateRideRequest {
  driverId: number;
  origin: string;
  destination: string;
  date: Date;
  maxCount: number;
  cost: number;
}
