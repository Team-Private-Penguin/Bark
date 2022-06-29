import db from "../db";

export default async function handler(req, res) {
  const [user] = req.query.friends;
  if (req.method === "GET") {
    await db
      .query(
        `
      SELECT
        (select name from barkschema.users where user_id = f.friend_id),
        (select photo from barkschema.users where user_id = f.friend_id),
        (select user_id from barkschema.users where user_id = f.friend_id)
      FROM barkschema.friends f
      WHERE user_id = $1 AND
      f.friend_id in (SELECT user_id from barkschema.friends where friend_id = $1)
      `, [user]
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err, 'friend get err')
        res.status(400).end();
      });
  }

}
