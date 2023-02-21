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
