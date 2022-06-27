import db from "./db";
import { postGroup } from "./db/model";

export default function handler(req, res) {
  if (req.method === "POST") {
    let { name, description, admin_id } = req.body;
    const query = {
      text: postEvent,
      values: [name, description, admin_id],
    };
    db.queryAsync(query)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });

  } else {
    res.sendStatus(404);
  }
}