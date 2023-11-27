// Database connections
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  min: 0,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

pool
  .connect()
  .then(() => {
    console.log("Database connection established.");
  })
  .catch((e) => {
    throw new Error(e);
  });

module.exports = pool;
