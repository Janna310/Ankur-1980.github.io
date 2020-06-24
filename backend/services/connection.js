// require("dotenv").config();
const pgEnv = require("./pg.env");

const { Pool } = require("pg");

const credentials = new Pool({
  user: pgEnv.PG_USER,
  password: pgEnv.PG_PASSWORD,
  host: pgEnv.PG_HOST,
  port: pgEnv.PG_PORT,
  database: pgEnv.PG_DB,
  ssl: pgEnv.PG_SSL,
});

module.exports = credentials;

// // check to see if app is in production
// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgressql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:$${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const credentials = new Pool({
//   connectionString: isProduction ? process.env.URL : connectionString,
// });

// // Amazon RDS Cloud
// const credentials = new Pool({
//   user: "postgres",
//   password: "password",
//   host: "capstone-project.cssdesi1idkq.us-east-2.rds.amazonaws.com",
//   port: 5432,
//   database: "Capstone",
//   ssl: false,
// });

// local server
