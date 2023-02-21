import { Connection, createConnection, OkPacket } from "mysql";
import { promisify } from "util";
import { GuestDetails } from "../models/models";

//dotenv config
import * as dotenv from "dotenv";
dotenv.config();

export class MySQLConnectionParams {
  host!: string;
  port!: number;
  user!: string;
  password!: string;
  database!: string;
}

/**
 * MySQL class responsible for all the operations inside MySQL database
 */
export default class MySQL extends MySQLConnectionParams {
  private connection!: Connection;
  private promosifiedQuery: any;

  constructor(connectionParams: MySQLConnectionParams) {
    super();
    const { database } = connectionParams;
    this.database = database;
    this.connectToMySQL(connectionParams);

    this.promosifiedQuery = promisify(this.connection.query).bind(
      this.connection
    );
  }

  destructor() {
    if (this.connection) {
      this.connection.end();
    }
  }

  connectToMySQL(connectionParams: MySQLConnectionParams): void {
    const { host, port, user, password, database } = connectionParams;
    this.connection = createConnection({
      host,
      port,
      user,
      password,
      database,
    });
    this.connection.connect(function (error: Error) {
      if (error) {
        throw new Error(error.message);
      }
      console.log("Successfully connected to MySQL");
    });
  }

  async addGuest<T>(guestDetails: GuestDetails): Promise<OkPacket | Error> {
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
      "INSERT INTO guest_details (`firstName`, `lastName`, `email`, `dateOfBirth`, `city`, `country`, `passportForename`, `passportSurname`, `passportNumber`, `passportDateOfIssue`, `passportDateOfExpiry`) " +
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
