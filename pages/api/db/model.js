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

  getUserEvents: `SELECT *
      FROM barkschema.users_events
      JOIN barkschema.events USING (event_id)
      WHERE user_id = $1
    `,
  postUser: `INSERT INTO barkschema.Users (
    user_id,
    zipcode,
    size,
    energy,
    f_people,
    f_dogs,
    photo,
    name
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `,
  getUser: `SELECT * FROM barkschema.Users`,
};
