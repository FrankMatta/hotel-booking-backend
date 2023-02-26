import { createConnection } from "mysql";
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
export default class MySqlDatabase extends MySQLConnectionParams {
  private static instance: MySqlDatabase | null = null;
  public connection: any;

  constructor() {
    super();
  }

  public static async getInstance(): Promise<MySqlDatabase> {
    if (!MySqlDatabase.instance) {
      MySqlDatabase.instance = new MySqlDatabase();
      await MySqlDatabase.instance.connect();
    }
    return MySqlDatabase.instance;
  }

  destructor() {
    if (this.connection) {
      this.connection.end();
    }
  }

  connect(): void {
    const { host, port, user, password, database } = this;
    this.connection = createConnection({
      host,
      port,
      user,
      password,
      database,
    });
    this.connection = promisify(this.connection.query).bind(this.connection);
  }
}