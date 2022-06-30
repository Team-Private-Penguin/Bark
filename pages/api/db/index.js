const Promise = require("bluebird");
const { Pool } = require("pg");
const { FileWatcherEventKind } = require("typescript");

const pool = new Pool({
<<<<<<< HEAD
  user: process.env.PGUSERNAME || "postgres",
  host: "127.0.0.1",
=======
  user: process.env.PGUSERNAME || "",
  host: process.env.PGHOST || "127.0.0.1",
>>>>>>> 05d7779fd3b54369399516ba051423b312f8079d
  database: "bark",
  password: process.env.PGPASS || "password",
  port: process.env.PGPORT || 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = db;
