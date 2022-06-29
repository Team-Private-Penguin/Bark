import db from "../db";
import { postEventComment, getEventComments, deleteComment } from "../db/model";
import React from "react";

export default function handler(req, res) {
  if (req.method === "POST") {
    let { user_id, comment, event_id } = req.body;
    const query = {
      text: postEventComment,
      values: [comment, event_id, user_id],
    };
    return db
      .queryAsync(query)
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET") {
    let { id } = req.query;
    const query = {
      text: getEventComments,
      values: [id],
    };
    return db
      .queryAsync(query)
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "DELETE") {
    let { id } = req.query;
    const query = {
      text: deleteComment,
      values: [id],
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
