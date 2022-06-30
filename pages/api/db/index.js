const Promise = require("bluebird");
const { Pool } = require("pg");
const { FileWatcherEventKind } = require("typescript");
require('dotenv').config();

const pool = new Pool({
<<<<<<< HEAD
  user: process.env.PGUSERNAME,
  host: process.env.PGHOST,
  database: "bark",
  password: process.env.PGPASS,
  port: process.env.PGPORT,
=======
  user: process.env.PGUSERNAME || "ubuntu",
  host: process.env.PGHOST || "34.214.151.84",
  database: "bark",
  password: process.env.PGPASS || "Penguin2204",
  port: process.env.PGPORT || 5432,
>>>>>>> main
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = db;
