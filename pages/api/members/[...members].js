import db from "../db";

export default async function handler(req, res) {
  const [group] = req.query.members;
  if (req.method === "GET") {
    await db
      .query(
        `
      SELECT
        (select name from barkschema.users where user_id = u.user_id),
        (select photo from barkschema.users where user_id = u.user_id),
        (select user_id from barkschema.users where user_id = u.user_id)
      FROM barkschema.users_groups u
      WHERE group_id = ${group}
      `
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err, 'friend get err')
        res.status(400).end();
      });
  }

}
