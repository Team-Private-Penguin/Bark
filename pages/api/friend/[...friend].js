import db from "../db";

export default async function handler(req, res) {
  const [user, friend] = req.query.friend;
  if (req.method === "GET") {
    await db
      .query(
        `
      SELECT
        (select name from barkschema.users where user_id = f.friend_id),
        (select photo from barkschema.users where user_id = f.friend_id),
        (select user_id from barkschema.users where user_id = f.friend_id)
      FROM barkschema.friends f
      WHERE user_id = $1 AND friend_id = $2
      `, [user, friend]
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err, 'friend get err')
        res.status(400).end();
      });
  }
  if (req.method === "POST") {
    await db.query(
      `INSERT INTO barkschema.friends(user_id, friend_id)
      VALUES ($1, $2)
      `, [req.body.user, req.body.friend]
    ).then(() => res.status(200).end())
    .catch((err) => {
      console.log(err)
      res.status(400).end()
    })
  }
  if (req.method === "DELETE") {
    console.log(user,friend)
    await db.query(
      `DELETE from barkschema.friends f
      WHERE f.user_id = $1 AND
      f.friend_id = $2
      `, [user, friend]
    ).then(() => res.status(200).end())
    .catch((err) => {
      console.log(err)
      res.status(400).end()
    })
  }
}

