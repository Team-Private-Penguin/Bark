import db from "../db";
import React from "react";

const postUserRsvp = `INSERT INTO barkschema.users_events (
    user_id,
    event_id
  ) VALUES ($1, $2)
`;

const getEventRsvps = `SELECT *
  FROM barkschema.users_events
  JOIN barkschema.users USING (user_id)
  WHERE event_id = $1
`;

const getUserRsvps = `SELECT *
  FROM barkschema.users_events
  JOIN barkschema.events USING (event_id)
  WHERE user_id = $1
`;

const deleteUserRsvp = `DELETE FROM barkschema.users_events WHERE user_id = $1`;

export default function handler(req, res) {
  if (req.method === "POST") {
    let { user_id, event_id } = req.body;
    const query = {
      text: postUserRsvp,
      values: [user_id, event_id],
    };
    return db
      .queryAsync(query)
      .then((data) => res.status(201).send(data))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET" && req.query.user_id) {
    let { user_id } = req.query;
    const query = {
      text: getUserRsvps,
      values: [user_id],
    };
    return db
      .queryAsync(query)
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET" && req.query.event_id) {
    let { event_id } = req.query;
    const query = {
      text: getEventRsvps,
      values: [event_id],
    };
    return db
      .queryAsync(query)
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "DELETE") {
    let { user_id } = req.body;
    const query = {
      text: deleteUserRsvp,
      values: [user_id],
    };
    return db
      .queryAsync(query)
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else {
    res.status(500).send(err);
  }
}
