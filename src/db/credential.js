import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const DB = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default DB;
