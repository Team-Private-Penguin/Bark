const db = require("../pages/api/db");

//`CREATE DATABASE bark` if not exists

db.queryAsync(`DROP SCHEMA IF EXISTS barkschema CASCADE`)
  .then(() => db.queryAsync(`CREATE SCHEMA barkschema`))
  .then(() =>
    db.queryAsync(`CREATE TABLE barkschema.users (
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
      `ALTER TABLE barkschema.users ADD CONSTRAINT users_pkey PRIMARY KEY (user_id)`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE TABLE barkschema.groups (
    group_id BIGSERIAL,
    description VARCHAR,
    name VARCHAR,
    admin_id VARCHAR
    )`
    )
  )
  .then(() =>
    db.queryAsync(
      `ALTER TABLE barkschema.groups ADD CONSTRAINT groups_pkey PRIMARY KEY (group_id)`
    )
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.events (
      event_id BIGSERIAL,
      owner_id VARCHAR,
      group_id BIGSERIAL NOT NULL,
      name VARCHAR,
      date DATE NOT NULL,
      description VARCHAR,
      lat FLOAT8,
      lng FLOAT8,
      address VARCHAR,
      prospective BOOLEAN,
      img_url VARCHAR
    )`)
  )
  .then(() =>
    db.queryAsync(`
    ALTER TABLE barkschema.events ADD CONSTRAINT events_pkey PRIMARY KEY (event_id)
  `)
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX eventsgroup_index ON barkschema.events (group_id)`
    )
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.comments (
    comment_id BIGSERIAL,
    comment VARCHAR,
    event_id BIGSERIAL,
    user_id VARCHAR,
    date TIMESTAMPTZ
    )
  `)
  )
  .then(() =>
    db.queryAsync(`
  ALTER TABLE barkschema.comments ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id)
  `)
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX commentsevent_index ON barkschema.comments (event_id)`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX commentsuser_index ON barkschema.comments (user_id)`
    )
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.friends (
    friend_id VARCHAR,
    user_id VARCHAR
    )
  `)
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX friendsfriend_index ON barkschema.friends (user_id)`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX friendsuser_index ON barkschema.friends (friend_id)`
    )
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.users_groups (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR,
    group_id BIGSERIAL
    )
  `)
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX groupsuser_index ON barkschema.users_groups (user_id)`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX usersgroup_index ON barkschema.users_groups (group_id)`
    )
  )
  .then(() =>
    db.queryAsync(`
    CREATE TABLE barkschema.users_events (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR,
    event_id BIGSERIAL
    )
  `)
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX eventsuser_index ON barkschema.users_events (user_id)`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX usersevent_index ON barkschema.users_events (event_id)`
    )
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
    db.queryAsync(
      `CREATE INDEX messagesuser_index ON barkschema.messages (user_id)`
    )
  )
  .then(() =>
    db.queryAsync(
      `CREATE INDEX messegesfriend_index ON barkschema.messages(friend_id)`
    )
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
  .then(() => console.log("congrats! you are a champion"))
