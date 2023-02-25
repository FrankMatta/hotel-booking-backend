import { Request, Response, NextFunction } from "express";
import Guests from "../database/guests";
import sendGuestEmail from "../services/send_emails";
import { OkPacket } from "mysql";


const saveGuestDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const { body } = req;
  const guests = new Guests();
  const result: OkPacket | Error = await guests.create(body)
  if (!(result instanceof Error)) {
    res.status(200).send({message: 'Guest created successfully!'});
    sendGuestEmail(body);
  } else {
    res.status(500).send('Internal server error')
  }
};

export default { saveGuestDetails };
