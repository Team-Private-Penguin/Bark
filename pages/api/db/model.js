import db from "./";

module.exports = {
  postEvent: `INSERT INTO Events (
    name,
    description,
    address,
    group_id,
    date,
    prospective
  )
  VALUES ($1, $2, $3, $4, $5, $6)
  `,

  getEventsGroup: `SELECT * FROM Events WHERE group_id = $1`,
};
