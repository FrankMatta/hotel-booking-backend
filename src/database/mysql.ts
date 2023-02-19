import { Connection, createConnection, OkPacket } from "mysql";
import { promisify } from "util";
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
    this.connection.connect(function (error) {
      if (error) {
        console.error("Error connecting to MySQL: " + error.message);
        return;
      }
      console.log("Successfully connected to MySQL");
    });
  }

  async insert<T>(table: string, data: object): Promise<boolean> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((v) => `'${v}'`).join(", ");
    const query = `INSERT INTO ${table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;

    console.log("query:", query);

    try {
      const inserted: Promise<OkPacket> = await this.promosifiedQuery(query);
      console.log("inserteddd", (await inserted).insertId)
      return !isNaN((await inserted).insertId);
    } catch (error: any) {
      return error;
    }
  }
}