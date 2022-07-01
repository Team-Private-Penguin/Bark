import db from "../db";

export default async function handler(req, res) {
  const [user] = req.query.requests;
  if (req.method === "GET") {
    await db
      .query(
        `
        SELECT
        (select name from barkschema.users where user_id = f.user_id),
        (select photo from barkschema.users where user_id = f.user_id),
        (select user_id from barkschema.users where user_id = f.user_id)
        FROM barkschema.friends f
        WHERE friend_id=$1 AND
        user_id NOT IN
        (select friend_id from barkschema.friends where user_id = $1 AND friend_id is not null);
      `,
        [user]
      )
      .then((result) => {
        res.status(200).send(result.rows);
      })
      .catch((err) => {
        console.log(err, "requests get err");
        res.status(400).end();
      });
  }
}
