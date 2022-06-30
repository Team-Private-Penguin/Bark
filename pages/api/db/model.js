module.exports = {
  postEvent: `INSERT INTO barkschema.events (
    name,
    description,
    address,
    group_id,
    date,
    prospective,
    owner_id,
    img_url
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `,

  getEventsGroup: `SELECT * FROM barkschema.events WHERE group_id = $1`,

  postGroup: `INSERT INTO barkschema.groups (
    name,
    description,
    admin_id
  )
  VALUES ($1, $2, $3) returning group_id
  `,

  getAllGroups: `SELECT * FROM barkschema.groups`,

  getGroup: `SELECT * FROM barkschema.groups WHERE group_id = $1`,

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

  getGroupId: `SELECT (group_id) FROM barkschema.events
  WHERE event_id = $1`,

  updateEvent: `UPDATE barkschema.Events
  event_id = $1,
  group_id = $2,
  name = $3,
  date = $4,
  description = $5,
  lat = $6,
  lng = $7,
  address = $8,
  prospective = $9,
  img_url = $10`,


  getUserEvents: `SELECT *
    FROM barkschema.users_events
    JOIN barkschema.events USING (event_id)
    WHERE user_id = $1
  `,

  postUser: `INSERT INTO barkschema.users (
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
  getUser: `SELECT * FROM barkschema.Users WHERE user_id = $1`,

  getUserGroupsEvents: `SELECT e.address, e.name, e.date, g.name AS group_name, e.description, e.prospective, g.admin_id, e.event_id, g.group_id, e.owner_id, e.img_url
    FROM barkschema.users_groups ug
    JOIN barkschema.groups g USING (group_id)
    JOIN barkschema.events e USING (group_id)
    WHERE user_id = $1
    ORDER BY e.date DESC
  `,

  postEventComment: `INSERT INTO barkschema.comments (
    comment,
    event_id,
    user_id,
    date
  ) VALUES ($1, $2, $3, (SELECT now()))
  `,

  getEventComments: `SELECT *
    FROM barkschema.comments
    JOIN barkschema.users USING (user_id)
    WHERE event_id = $1
    ORDER BY date DESC
  `,

  editUser: `UPDATE barkschema.Users
  SET zipcode = $2,
  size = $3,
  energy = $4,
  f_people = $5,
  f_dogs = $6,
  photo = $7,
  name = $8
  WHERE user_id = $1`,
};
