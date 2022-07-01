import db from "./db";
import { getGroupId } from "./db/model";

export default function handler(req, res) {
  if (req.method === "GET" && req.query.type === "getGroupId") {
    return db

      .queryAsync(getGroupId)
      .then((res) => res.status(200).send(res.data)) //this need to change to send the admin id back.
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  } else {
    res.sendStatus(404);
  }
}
