import db from "./db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await db
      .query(
        `
      SELECT * from barkschema.users;
      `
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err, 'allusers get err')
        res.status(400).end();
      });
  }

}
