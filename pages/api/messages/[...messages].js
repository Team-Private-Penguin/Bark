import db from "../db";

export default async function handler(req, res) {
  const [user, friend] = req.query.messages;
  if (req.method === "GET") {
    await db
      .query(
        `
      SELECT
        (select name from barkschema.users where user_id = m.user_id),
        m.text,
        (select photo from barkschema.users where user_id = m.user_id),
        m.time,
        m.user_id
      FROM barkschema.messages m
      WHERE (user_id = $2 AND friend_id = $1) OR (user_id = $1 AND friend_id = $2)
      ORDER BY m.time;
      `,
        [user, friend]
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err, "message get err", friend, user);
        res.status(400).end();
      });
  }
  if (req.method === "POST") {
    await db
      .query(
        `INSERT INTO barkschema.messages(user_id, friend_id, text, time)
      VALUES ($1, $2, $3, (SELECT now()))
      `,
        [user, friend, req.body.message]
      )
      .then(() => res.status(200).end())
      .catch((err) => {
        console.log(err, "message post err");
        res.status(400).end();
      });
  }
}
