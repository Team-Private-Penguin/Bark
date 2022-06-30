const Promise = require("bluebird");
const { Pool } = require("pg");
const { FileWatcherEventKind } = require("typescript");

const pool = new Pool({
  user: process.env.PGUSERNAME || "ubuntu",
  host: process.env.PGHOST || "34.214.151.84",
  database: "bark",
  password: process.env.PGPASS || "Penguin2204",
  port: process.env.PGPORT || 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = db;
