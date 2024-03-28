import pg from "pg";
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "perntodo",
  password: "password",
  port: 5432,
});
export default db;
