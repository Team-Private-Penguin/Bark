const db = require('../pages/api/db');
//`CREATE DATABASE bark` if not exists
db.queryAsync(`DROP SCHEMA IF EXISTS barkschema CASCADE`)
  .then(() => db.queryAsync(`CREATE SCHEMA barkschema`))
  .then(() => db.queryAsync(`CREATE TABLE barkschema.Users (
    user_id BIGSERIAL,
    zipcode INTEGER,
    size VARCHAR,
    energy INTEGER,
    f_people INTEGER,
    f_dogs INTEGER,
    photo VARCHAR,
    name INTEGER
   )`))
  .then(()=> db.queryAsync(`ALTER TABLE barkschema.Users ADD CONSTRAINT Users_pkey PRIMARY KEY (user_id)`))
  .then(()=> db.queryAsync(
    `CREATE TABLE barkschema.Groups (
    group_id BIGSERIAL,
    description VARCHAR,
    name INTEGER,
    admin VARCHAR
    )`))
  .then(()=> db.queryAsync(`ALTER TABLE barkschema.Groups ADD CONSTRAINT Groups_pkey PRIMARY KEY (group_id)`))
  .then(()=> db.queryAsync(`
    CREATE TABLE barkschema.Events (
      event_id BIGSERIAL,
      name INTEGER,
      description VARCHAR
    )`))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Events ADD CONSTRAINT Events_pkey PRIMARY KEY (event_id)
  `))
  .then(()=> db.queryAsync(`
    CREATE TABLE barkschema.Comments (
    comment_id BIGSERIAL,
    comment INTEGER,
    event_id INTEGER,
    user_id INTEGER
    )
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Comments ADD CONSTRAINT Comments_pkey PRIMARY KEY (comment_id)
  `))
  .then(()=> db.queryAsync(`
    CREATE TABLE barkschema.Friends (
    friend_id BIGSERIAL,
    user_id INTEGER
    )
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Friends ADD CONSTRAINT Friends_pkey PRIMARY KEY (friend_id)
  `))
  .then(()=> db.queryAsync(`
    CREATE TABLE barkschema.Users_Groups (
    user_id BIGSERIAL,
    group_id INTEGER
    )
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Users_Groups ADD CONSTRAINT Users_Groups_pkey PRIMARY KEY (user_id)
  `))
  .then(()=> db.queryAsync(`
    CREATE TABLE barkschema.Users_Events (
    user_id BIGSERIAL,
    event_id INTEGER
    )
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Users_Events ADD CONSTRAINT Users_Events_pkey PRIMARY KEY (user_id)
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Comments ADD CONSTRAINT Comments_event_id_fkey FOREIGN KEY (event_id) REFERENCES barkschema.Events(event_id)
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Comments ADD CONSTRAINT Comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id)
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Friends ADD CONSTRAINT Friends_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id);
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Users_Groups ADD CONSTRAINT Users_Groups_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id)
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Users_Groups ADD CONSTRAINT Users_Groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES barkschema.Groups(group_id)
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Users_Events ADD CONSTRAINT Users_Events_user_id_fkey FOREIGN KEY (user_id) REFERENCES barkschema.Users(user_id)
  `))
  .then(()=> db.queryAsync(`
    ALTER TABLE barkschema.Users_Events ADD CONSTRAINT Users_Events_event_id_fkey FOREIGN KEY (event_id) REFERENCES barkschema.Events(event_id)
  `))