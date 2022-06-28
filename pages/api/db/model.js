module.exports = {
  postEvent: `INSERT INTO barkschema.events (
    name,
    description,
    address,
    group_id,
    date,
    prospective
  )
  VALUES ($1, $2, $3, $4, $5, $6)
  `,

  getEventsGroup: `SELECT * FROM barkschema.events WHERE group_id = $1`,

  postGroup: `INSERT INTO barkschema.groups (
    name,
    description,
    admin_id
  )
  VALUES ($1, $2, $3)
  `,

  getAllGroups: `SELECT * from barkschema.groups`,

  postUserToGroup: `INSERT INTO barkschema.users_groups (
    user_id,
    group_id
  )
  VALUES ($1, $2)
  `,

  getUserGroups: `SELECT *
    FROM barkschema.users_groups
    JOIN barkschema.groups USING (group_id)
    WHERE user_id = $1
    `,


  getAdmin: `SELECT admin_id FROM barkschema.Groups`,

  deleteEvent: `DELETE FROM barkschema.Events
  WHERE event_id = $1`,

  updateEvent: `UPDATE barkschema.Events
  SET group_id = $1,
  name = $2,
  date = $3,
  description = $4,
  lat = $5,
  lng = $6,
  address = $7,
  prospective = $8 `,
};
