const Promise = require("bluebird");
const { Pool } = require("pg");
const { FileWatcherEventKind } = require("typescript");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bark",
  password: "password",
  port: 5151,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = db;
