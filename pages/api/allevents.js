import db from "./db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await db
      .query(
        `
        SELECT *, (SELECT g.name from barkschema.groups g where g.group_id = e.group_id) as gName from barkschema.events e
      `,
      )
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => {
        console.log(err, 'events get err')
        res.status(400).end();
      });
  }

}
