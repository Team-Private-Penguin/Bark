import db from "../db";
import Promise from "bluebird";
require('dotenv').config();

export default async function handler(req, res) {

  let userId = req.query.id;
  let eventId = req.query.event;

  if (req.method === 'GET') {

    //console.log(`Data in endpoint: ${userId}, ${eventId}`);

    let getEventRsvp = `SELECT * FROM barkschema.users_events WHERE user_id=$1`;

    await db.queryAsync(getEventRsvp, [userId])
      .then((response) => {
        if (response[0].rows.length > 0) {
          // console.log(response[0].rows);
          res.status(200).send(response[0].rows);
        } else {
          res.status(404).send(false);
        }
      })
      .catch((err) => {
        console.log(`Error in /map/RSVP endpoint`);
        res.status(400).end();
      })
  } else if (req.method === "PUT") {

    let unRsvp = `DELETE * FROM barkschema.users_events WHERE user_id=$1 AND event_id=$2`;

    await db.queryAsync(unRsvp, [userId, eventId])
      .then((response) => {
        res.status(200).send('Done');
      })
      .catch((err) => {
        console.log(`Error in /map/rsvp endpoint`);
        return err;
      })
  }
}