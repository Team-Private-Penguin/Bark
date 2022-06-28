module.exports = {
  postEvent: `INSERT INTO barkschema.Events (
    name,
    description,
    address,
    group_id,
    date,
    prospective
  )
  VALUES ($1, $2, $3, $4, $5, $6)
  `,

  getEventsGroup: `SELECT * FROM barkschema.Events WHERE group_id = $1`,

  postGroup: `INSERT INTO barkschema.groups (
    name,
    description,
    admin_id
  )
  VALUES ($1, $2, $3)
  `,
  //VALUES ($1, $2, $3)
  getGroupsUser: `SELECT * barkschema.User_Groups
    WHERE user_id = $1
    JOIN Groups USING (group_id)
    WHERE Groups.group_id = User_Groups.group_id
  `,
  getAllGroups: `SELECT * from barkschema.groups`,
};
