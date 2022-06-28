import db from "./db";
import { postGroup, getAllGroups } from "./db/model";

export default function handler(req, res) {
  if (req.method === "POST") {
    let { name, description, admin_id } = req.body;
    const query = {
      text: postGroup,
      values: [name, description, admin_id],
    };
    return db
      .queryAsync(query)
      .then(() => {
        res.status(201).json({ message: "ok" });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else if (req.method === "GET") {
    return db
      .query(getAllGroups)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(404).send();
  }
}
