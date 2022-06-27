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
      WHERE user_id = ${user} OR friend_id=${user}
      ORDER BY m.time;
      `
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err)
        res.status(400).end();
      });
  }
  if (req.method === "POST") {
    console.log(user, friend);
    console.log(req.body.message);
    await db.query(
      `INSERT INTO barkschema.messages(user_id, friend_id, text, time)
      VALUES (${user}, ${friend}, ${"'" + req.body.message + "'"}, (SELECT now()))
      `
    ).then(() => res.status(200).end())
    .catch((err) => {
      console.log(err)
      res.status(400).end()
    })
  }
}
