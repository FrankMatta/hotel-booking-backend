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

enum BookingPer {
  PERSON="person",
  BOOKING="booking"
}
export interface BookingDetails {
  guest_id?: string;
  description: string;
  price: number;
  bookStartDate: Date;
  bookEndDate: Date;
  bookingPer: BookingPer;
  adultsCount: number;
  childrenCount: number;
}