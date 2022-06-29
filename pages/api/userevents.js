import db from "./db";
import { getUserGroupsEvents, postUserEventRSVP } from "./db/model";
import React from "react";

export default function handler(req, res) {
  if (req.method === "POST") {
    let { user_id } = req.query;
    const query = {
      text: postUserEventRSVP,
      values: [user_id],
    };
    return db
      .queryAsync(query)
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET") {
    let { user_id } = req.query;
    const query = {
      text: getUserGroupsEvents,
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
