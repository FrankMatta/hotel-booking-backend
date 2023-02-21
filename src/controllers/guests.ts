import { Request, Response, NextFunction } from "express";
import { MySQLConnectionParams } from "../database/mysql";
import MySQL from "../database/mysql";
import sendGuestEmail from "../services/send_emails";
import { OkPacket } from "mysql";

const params: MySQLConnectionParams = {
  host: process.env.host!,
  port: parseInt(process.env.port!),
  user: process.env.user!,
  password: process.env.password!,
  database: process.env.database!,
};
const mysql = new MySQL(params);


const saveGuestDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const { body } = req;
  const result: OkPacket | Error = await mysql.addGuest(body)
  if (!(result instanceof Error)) {
    res.status(200).send();
    sendGuestEmail(body);
  } else {
    res.status(500).send('Internal server error')
  }
};

export default { saveGuestDetails };
