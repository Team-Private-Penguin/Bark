const Promise = require("bluebird");
const { Pool } = require("pg");

const pool = new Pool({
  //user: process.env.PGUSERNAME,
  host: "127.0.0.1",
  database: "bark",
  //password: process.env.PGPASS,
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

console.log(process.env.PGPORT)

const db = Promise.promisifyAll(pool, {multiArgs: true});

module.exports = db;