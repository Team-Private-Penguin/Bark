const db = require("../pages/api/db");
//`CREATE DATABASE bark` if not exists
db.queryAsync(`DROP SCHEMA IF EXISTS barkschema CASCADE`)
  .then(() => db.queryAsync(`CREATE SCHEMA barkschema`))
  .then(() =>
    db.queryAsync(`CREATE TABLE barkschema.Users (
    user_id VARCHAR,
    zipcode VARCHAR,
    size VARCHAR,
    energy VARCHAR,
    f_people VARCHAR,
    f_dogs VARCHAR,
    photo VARCHAR,
    name VARCHAR
   )`)
  )
  .then(() =>
    db.queryAsync(
      `ALTER TABLE barkschema.Users ADD CONSTRAINT Users_pkey PRIMARY KEY (user_id)`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE TABLE barkschema.Groups (
    group_id BIGSERIAL,
    description VARCHAR,
    name VARCHAR,
    admin_id BIGSERIAL
    )`
    )
  )
  .then(() =>
    db.queryAsync(
      `ALTER TABLE barkschema.Groups ADD CONSTRAINT Groups_pkey PRIMARY KEY (group_id)`
    )
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.Events (
      event_id BIGSERIAL,
      group_id BIGSERIAL NOT NULL,
      name VARCHAR,
      date DATE NOT NULL,
      description VARCHAR,
      lat FLOAT8,
      lng FLOAT8,
      address VARCHAR,
      prospective BOOLEAN
    )`)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Events ADD CONSTRAINT Events_pkey PRIMARY KEY (event_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.Comments (
    comment_id BIGSERIAL,
    comment INTEGER,
    event_id INTEGER,
    user_id VARCHAR
    )
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Comments ADD CONSTRAINT Comments_pkey PRIMARY KEY (comment_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.Friends (
    friend_id VARCHAR,
    user_id VARCHAR
    )
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Friends ADD CONSTRAINT Friends_pkey PRIMARY KEY (friend_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.Users_Groups (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR,
    group_id BIGSERIAL
    )
  `)
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.Users_Events (
    user_id VARCHAR,
    event_id INTEGER
    )
  `)
  )
  .then(() =>
    db.queryAsync(`
      CREATE TABLE barkschema.Messages (
      user_id VARCHAR,
      friend_id VARCHAR,
      text VARCHAR,
      time TIMESTAMPTZ,
      sent BOOLEAN
      )
    `)
  )

  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Messages ADD CONSTRAINT
      Messages_user_id FOREIGN KEY (user_id)
      REFERENCES barkschema.Users(user_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Messages ADD CONSTRAINT Messages_friend_id_fkey FOREIGN KEY (friend_id)
    REFERENCES barkschema.Users(user_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Comments ADD CONSTRAINT Comments_event_id_fkey FOREIGN KEY (event_id) REFERENCES barkschema.Events(event_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Comments ADD CONSTRAINT Comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Friends ADD CONSTRAINT Friends_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id);
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Users_Groups ADD CONSTRAINT Users_Groups_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Users_Groups ADD CONSTRAINT Users_Groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES barkschema.Groups(group_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Users_Events ADD CONSTRAINT Users_Events_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Users_Events ADD CONSTRAINT Users_Events_event_id_fkey FOREIGN KEY (event_id) REFERENCES barkschema.Events(event_id)
  `)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.Events ADD CONSTRAINT Events_group_id_fkey FOREIGN KEY (group_id) REFERENCES barkschema.Groups(group_id)
  `)
  )
  .then(() => console.log("congrats! you are a champion"));
