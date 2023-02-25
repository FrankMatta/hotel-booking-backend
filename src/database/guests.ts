import { OkPacket } from "mysql";
import { GuestDetails } from "../models/models";
import MySQL from "./mysql";

export default class Guests extends MySQL {
  async create(guestDetails: GuestDetails): Promise<OkPacket | Error> {
    const { firstName, lastName, city, country, email, passportDetails } =
      guestDetails;
    const { foreName, surName, passportNumber } = passportDetails;
    const dateOfBirth: string = new Date(guestDetails.dateOfBirth)
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);
    const dateOfIssue: string = new Date(
      guestDetails.passportDetails.dateOfIssue
    )
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);
    const dateOfExpiry: string = new Date(
      guestDetails.passportDetails.dateOfExpiry
    )
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);

    const query =
      "INSERT INTO guests (`firstName`, `lastName`, `email`, `dateOfBirth`, `city`, `country`, `passportForename`, `passportSurname`, `passportNumber`, `passportDateOfIssue`, `passportDateOfExpiry`) " +
      `VALUES ('${firstName}', '${lastName}', '${email}', '${dateOfBirth}', '${city}', '${country}', '${foreName}', '${surName}', '${passportNumber}', '${dateOfIssue}', '${dateOfExpiry}')`;
    try {
      const guest: Promise<OkPacket> = await this.promosifiedQuery(query);
      return await guest;
    } catch (error: any) {
      throw new Error(
        "Something went wrong while inserting guest in the database"
      );
    }
  }
}
