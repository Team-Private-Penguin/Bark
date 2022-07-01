import db from "../db";
import Promise from "bluebird";
require('dotenv').config();

export default async function handler(req, res) {
  let id = req.query.id;

  console.log('Sending Request...');

  let getUserZipQueryString = `SELECT zipcode FROM barkschema.users WHERE user_id = $1`

  await db.queryAsync(getUserZipQueryString, [id])
    .then((response) => {
      res.status(200).send(response[0].rows[0].zipcode)
    })
    .catch((err) => {
      return err
    })

}