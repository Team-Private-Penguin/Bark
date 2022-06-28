const Promise = require("bluebird");
const { Pool } = require("pg");

const pool = new Pool({
  user: "jasonmatta",
  host: "127.0.0.1",
  database: "bark",
  password: process.env.PGPASS || "",
  port: process.env.PGPORT || 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = db;

// user: process.env.PGUSERNAME || "jasonmatta",
//   host: process.env.PGHOST || "127.0.0.1",
//   database: process.env.PGDATABASE || "bark",
//   password: process.env.PGPASS || "",
