const Promise = require("bluebird");
const { Pool } = require("pg");
const { FileWatcherEventKind } = require("typescript");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSERNAME,
  host: process.env.PGHOST,
  database: "bark",
  password: process.env.PGPASS,
  port: process.env.PGPORT,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = db;
