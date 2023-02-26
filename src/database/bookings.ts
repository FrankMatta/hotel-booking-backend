import { OkPacket } from "mysql";
import { BookingDetails } from "../models/models";
import MySQL from "./mysql";

export default class Bookings extends MySQL {
  async create(bookingDetails: BookingDetails): Promise<number | Error> {
    const {
      guestId: guest_id,
      description,
      price,
      bookingPer,
      adultsCount,
      childrenCount,
      bookStartDate,
      bookEndDate,
    } = bookingDetails;

    let startDate = new Date(bookStartDate);
    let endDate = new Date(bookEndDate);

    let appliedDiscount = 0;
    if (this.isHighSeason(startDate, endDate)) {
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
      "INSERT INTO bookings (`guest_id`, `description`, `price`, `bookingPer`, `adultsCount`, `childrenCount`, `bookStartDate`, `bookEndDate`, `appliedDiscount`) " +
      `VALUES ('${guest_id}','${description}', '${price}', '${bookingPer}', '${adultsCount}', '${childrenCount}', '${start}', '${end}', '${appliedDiscount}')`;
    try {
      const bookingId: Promise<OkPacket> = await this.promosifiedQuery(query);
      return (await bookingId).insertId
    } catch (error: any) {
      console.error("ERROR", error);
      throw new Error(
        "Something went wrong while inserting booking in the database"
      );
    }
  }

  private isHighSeason(startDate: Date, endDate: Date): boolean {
    // Create Date objects for high season periods
    const highSeason1Start = new Date(startDate.getFullYear(), 5, 1); // June 1st
    const highSeason1End = new Date(startDate.getFullYear(), 9, 31); // October 31st
    const highSeason2Start = new Date(startDate.getFullYear(), 11, 21); // December 21st
    const highSeason2End = new Date(startDate.getFullYear() + 1, 0, 10); // January 10th of next year

    // Check if either date falls within a high season period
    return (
      (startDate >= highSeason1Start && startDate <= highSeason1End) ||
      (startDate >= highSeason2Start && startDate <= highSeason2End) ||
      (endDate >= highSeason1Start && endDate <= highSeason1End) ||
      (endDate >= highSeason2Start && endDate <= highSeason2End)
    );
  }

  async getBookingById(bookingId: string) {
    const query = `SELECT bookings.id as bookingId, bookings.description, bookings.price, bookings.price, bookings.bookingPer, bookings.adultsCount, bookings.childrenCount, bookings.bookStartDate, bookings.bookEndDate, bookings.appliedDiscount, bookings.createdAt, guests.firstName, guests.lastName, guests.email from bookings RIGHT JOIN guests on bookings.guest_id = guests.id where bookings.id=${bookingId}`;
    try {
      const [data] = await this.promosifiedQuery(query);
      return data;
    } catch (error: any) {
      console.error("ERROR", error);
      throw new Error("Could not get booking from database");
    }
  }
}
