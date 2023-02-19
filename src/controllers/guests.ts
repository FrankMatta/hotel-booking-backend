import { Request, Response, NextFunction } from 'express';
import { MySQLConnectionParams } from '../database/mysql';
import MySQL from '../database/mysql';
export interface GuestDetails {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    city: string;
    country: string
    passportDetails: {
        foreName: string;
        surName: string;
        dateOfIssue: Date;
        dateOfExpiry: Date;
    }
}

const saveGuestDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const params: MySQLConnectionParams = {
        host: process.env.host!,
        port: parseInt(process.env.port!),
        user: process.env.user!,
        password: process.env.password!,
        database: process.env.database!,
      };
      const mysql = new MySQL(params);
      mysql.insert("guest_details", body)
}

export default { saveGuestDetails };
