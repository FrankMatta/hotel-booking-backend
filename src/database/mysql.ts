import { Connection, createConnection, OkPacket } from "mysql";
import { promisify } from "util";

//dotenv config
import * as dotenv from "dotenv";
dotenv.config();

class MySQLConnectionParams {
  host = process.env.host;
  port = parseInt(process.env.port!);
  user = process.env.user;
  password = process.env.password;
  database = process.env.database;
}

/**
 * MySQL class responsible for all the operations inside MySQL database
 */
export default class MySQL extends MySQLConnectionParams {
  private connection!: Connection;
  protected promosifiedQuery: any;

  constructor() {
    super();

    this.connectToMySQL();

    this.promosifiedQuery = promisify(this.connection.query).bind(
      this.connection
    );
  }

  destructor() {
    if (this.connection) {
      this.connection.end();
    }
  }

  connectToMySQL(): void {
    const { host, port, user, password, database } = this;
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
}