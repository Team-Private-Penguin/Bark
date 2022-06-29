import db from "./db";
import { postEvent, getEventsGroup, getAdmin, deleteEvent, updateEvent } from "./db/model";

export default function handler(req, res) {
  if (req.method === "POST") {
    let { name, description, address, group_id, date, prospective } = req.body;
    const query = {
      text: postEvent,
      values: [name, description, address, group_id, date, prospective],
    };
    let values = [name, description, address, group_id, date, prospective];
    console.log(query);
    return db
      .queryAsync(postEvent, values)
      .then(() => res.status(201).send("Ok"))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === 'GET' && req.query.body === 'admin') { //for getting admin id.

    return db
    .queryAsync(getAdmin)
    .then(() => res.status(200).send("OK")) //this need to change to send the admin id back.
    .catch((err) => {
      res.status(404).send(err);
    })

  } else if (req.method === "GET") {
    let { group_id } = req.body;
    const query = {
      text: getEventsGroup,
      values: [group_id],
    };
    return db
      .queryAsync(query)
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(404).send(err));
  } else if (req.method === "DELETE") {
    return db
    .queryAsync(deleteEvent, req.query.body)
    .then(() => {
      res.status(200).send("Deleted!");
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  } else if (req.method === "PUT") {  //consider patch

    return db
    .queryAsync(updateEvent, req.body)
    .then(() => {
      res.status(200).send("Updated!");
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  } else {
    res.sendStatus(404);
  }
}
