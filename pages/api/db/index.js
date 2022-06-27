const Promise = require("bluebird");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSERNAME || 'isaac',
  host: process.env.PGHOST || "127.0.0.1",
  database: process.env.PGDATABASE || "bark",
  password: process.env.PGPASS || "sdc",
  port: process.env.PGPORT || 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const db = Promise.promisifyAll(pool, {multiArgs: true});

module.exports = db;