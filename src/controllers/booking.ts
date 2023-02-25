import { Request, Response, NextFunction } from "express";
import Bookings from "../database/bookings";
import { OkPacket } from "mysql";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const bookings = new Bookings();
  const result: OkPacket | Error = await bookings.create(body);
  if (!(result instanceof Error)) {
    res.status(200).send();
  } else {
    res.status(500).send("Internal server error");
  }
};

export default { createBooking };
