export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  city: string;
  country: string;
  passportDetails: {
    foreName: string;
    surName: string;
    passportNumber: string;
    dateOfIssue: Date;
    dateOfExpiry: Date;
  };
}
{
  "description": null,
  "price": null,
  "bookStartDate": null,
  "bookEndDate": null,
  "bookingPer": "booking",
  "adultsCount": 1,
  "childrenCount": 0
}

enum BookingPer {
  PERSON="person",
  BOOKING="booking"
}
export interface BookingDetails {
  description: string;
  price: number;
  bookStartDate: Date;
  bookEndDate: Date;
  bookingPer: BookingPer;
  adultsCount: number;
  childrenCount: number;
}

