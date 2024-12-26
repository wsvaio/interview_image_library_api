import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const { host, user, database, password } = process.env;
const connection = await mysql.createConnection({
  host,
  user,
  database,
  password,
});

export default connection;
