import { OkPacket } from "mysql";
import { BookingDetails } from "../models/models";
import { isHighSeason } from "../services/bookingHelpers";
import MySQL from "./mysql";

export default class Bookings extends MySQL {
  async create(bookingDetails: BookingDetails): Promise<OkPacket | Error> {
    const {
      guest_id,
      description,
      price,
      bookingPer,
      adultsCount,
      childrenCount,
      bookStartDate,
      bookEndDate,
    } = bookingDetails;

    let startDate = new Date(bookStartDate)
    let endDate = new Date(bookEndDate)

    let appliedDiscount = 0;
    if (isHighSeason(startDate, endDate)) {
      appliedDiscount = 10;
    }


    let start = new Date(bookStartDate)
    .toISOString()
    .replace("T", " ")
    .slice(0, -5);

    let end = new Date(bookEndDate)
    .toISOString()
    .replace("T", " ")
      .slice(0, -5);
    
    const query =
      "INSERT INTO booking (`guest_id`, `description`, `price`, `bookingPer`, `adultsCount`, `childrenCount`, `bookStartDate`, `bookEndDate`, `appliedDiscount`) " +
      `VALUES ('${guest_id}','${description}', '${price}', '${bookingPer}', '${adultsCount}', '${childrenCount}', '${start}', '${end}', '${appliedDiscount}')`;
    console.log("QUERY:", query);
    try {
      const booking: Promise<OkPacket> = await this.promosifiedQuery(query);
      return await booking;
    } catch (error: any) {
      console.error("ERROR", error);
      throw new Error(
        "Something went wrong while inserting booking in the database"
      );
    }
  }
}
