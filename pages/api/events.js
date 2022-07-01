import db from "./db";
import { postEvent, getGroupId, updateEvent } from "./db/model";

const deleteEvent = `DELETE
FROM barkschema.events
WHERE event_id = $1;
`;

const deleteComments = `DELETE FROM barkschema.comments WHERE event_id = $1`;

const deleteUsersEvents = `DELETE FROM barkschema.users_events WHERE event_id = $1`;

const getGroupEvents = `SELECT e.address, e.name, e.date, g.name AS group_name, e.description, e.prospective, g.admin_id, e.owner_id, e.img_url, e.event_id
FROM barkschema.events e
JOIN barkschema.groups g USING (group_id)
WHERE group_id = $1
ORDER BY e.date ASC
`;

export default function handler(req, res) {
  if (req.method === "POST") {
    let {
      name,
      description,
      address,
      group_id,
      date,
      prospective,
      owner_id,
      img_url,
    } = req.body;
    let values = [
      name,
      description,
      address,
      group_id,
      date,
      prospective,
      owner_id,
      img_url,
    ];
    return db
      .queryAsync(postEvent, values)
      .then(() => res.status(201).send("Ok"))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET" && req.query.type === "getGroupId") {
    return db
      .queryAsync(getGroupId, [req.query.event_id])
      .then((res) => res.status(200).send(res.data)) //this need to change to send the admin id back.
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET") {
    let { group_id } = req.query;
    const query = {
      text: getGroupEvents,
      values: [group_id],
    };
    return db
      .queryAsync(query)
      .then((results) => res.status(200).send(results))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "DELETE") {
    return db
      .queryAsync(deleteComments, [req.body.event_id])
      .then(() => db.queryAsync(deleteUsersEvents, [req.body.event_id]))
      .then(() => db.queryAsync(deleteEvent, [req.body.event_id]))
      .then(() => {
        res.status(200).send("Deleted!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  } else if (req.method === "PATCH") {
    const obj = JSON.parse(req.query.body);

    const date9 = obj.date.substring(0, 10);

    let values = [
      obj.name,
      date9,
      obj.description,
      obj.address_1,
      parseInt(obj.event_id),
    ];

    return db
      .queryAsync(updateEvent, values)
      .then(() => {
        res.status(200).send("Updated!");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.sendStatus(404);
  }
}
