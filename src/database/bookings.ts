import { OkPacket } from "mysql";
import { BookingDetails } from "../models/models";
import MySQL from "./mysql";

export default class Bookings extends MySQL {
  async create(
    bookingDetails: BookingDetails
  ): Promise<OkPacket | Error> {
    const { guest_id, description, price, bookingPer, adultsCount, childrenCount } =
      bookingDetails;

    const bookStartDate: string = new Date(bookingDetails.bookStartDate)
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);

    const bookEndDate: string = new Date(bookingDetails.bookEndDate)
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);

    const query =
      
      "INSERT INTO booking (`guest_id`, `description`, `price`, `bookingPer`, `adultsCount`, `childrenCount`, `bookStartDate`, `bookEndDate`) " +
      `VALUES ('${guest_id}','${description}', '${price}', '${bookingPer}', '${adultsCount}', '${childrenCount}', '${bookStartDate}', '${bookEndDate}')`;
    try {
      const booking: Promise<OkPacket> = await this.promosifiedQuery(query);
      return await booking;
    } catch (error: any) {
      console.error("ERROR", error)
      throw new Error(
        "Something went wrong while inserting booking in the database"
      );
    }
  }
}
