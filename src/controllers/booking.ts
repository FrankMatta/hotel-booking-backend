import { Request, Response, NextFunction } from "express";
import Bookings from "../database/bookings";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const bookings = new Bookings();
  const result: number | Error = await bookings.create(body);
  if (!(result instanceof Error)) {
    res.status(200).send({message: "Booking created successfully!", bookingId: result});
  } else {
    res.status(500).send("Internal server error");
  }
};

const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookingId = req.query.bookingId as string;
  const bookings = new Bookings();
  const booking = await bookings.getBookingById(bookingId);
  return res.status(200).send(booking)
};


export default { createBooking, getBooking };
