import axios from "axios";
import db from "../db";
import Promise from "bluebird";
require('dotenv').config();

export default async function handler(req, res) {

  let searchValues = req.query.value.split(' ');
  let list = [];
  let results = [];
  let eventSearch = req.query.eventSearch;
  let groupSearch = req.query.groupSearch;

  if (eventSearch) {
    await db.queryAsync(`SELECT event_id, name, description FROM barkschema.Events`)
    .then((response) => {
      let eventInfo = response[0].rows;
      eventInfo['table'] = 'Events';
      eventInfo['id_type'] = 'event';
      list = [...list, ...eventInfo];
    })
    .catch((err) => {
      console.log(`404, data not found`);
      res.status(404).send(err);
    })
  }

  if (groupSearch) {
    await db.queryAsync(`SELECT group_id, name, description FROM barkschema.Groups`)
    .then((response) => {
      let groupInfo = response[0].rows;
      groupInfo['table'] = 'Groups';
      groupInfo['id_type'] ='group';
      list = [...list, ...groupInfo];
    })
    .catch((err) => {
      console.log(`404, data not found`);
      res.status(404).send(err);
    })
  }

  Promise.all(list.map((itemToSearch) => {
    searchValues.map((searchValue) => {

      if (itemToSearch.name.toLowerCase().includes(searchValue.toLowerCase()) || itemToSearch.description.toLowerCase().includes(searchValue.toLowerCase())) {
        if (itemToSearch.table === 'Events') {
          db.queryAsync(`SELECT * FROM barkschema.Events WHERE event_id=${itemToSearch.event_id}`)
            .then((response) => {
              console.log(response[0].rows);
            })
        } //else if (itemToSearch.table === 'Groups') {
        //   db.queryAsync(`SELECT * FROM barkschema.Groups WHERE group_id=${itemToSearch.group_id}`)
        //     .then((response) => {
        //       console.log(response[0].rows)
        //     })
        // }
      }

    })
  }))

  //console.log(results);

}