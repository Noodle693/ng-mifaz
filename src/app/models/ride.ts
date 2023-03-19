export interface IRide {
  rideId: number;
  driverId: number;
  driverFirstName: string;
  driverLastName: string;
  origin: string;
  destination: string;
  date: string;
  passengerCount: number;
  maxCount: number;
  cost: number;
}
