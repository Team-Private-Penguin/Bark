import db from "./db";
import { postEvent, getEventsGroup } from "./db/model";

export default function handler(req, res) {
  if (req.method === "POST") {
    let { name, description, address, group_id, date, prospective } = req.body;
    const query = {
      text: postEvent,
      values: [name, description, address, group_id, date, prospective],
    };
    let values = [name, description, address, group_id, date, prospective];
    console.log(query);
    db.queryAsync(postEvent, values)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET") {
    let { group_id } = req.body;
    const query = {
      text: getEventsGroup,
      values: [group_id],
    };
    db.queryAsync(query)
      .then((results) => res.status(200).send(results))
      .catch((err) => res.status(404).send(err));
  } else {
    res.sendStatus(404);
  }
}
