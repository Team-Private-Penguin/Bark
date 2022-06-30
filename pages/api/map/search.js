import axios from "axios";
import db from "../db";
import Promise from "bluebird";
require('dotenv').config();

let searchItems = (obj, termArray) => {
  let results;

  termArray.map((term) => {
    //console.log(`Term: ${term}`);
    term = term.toLowerCase();
    let name = obj.name.toLowerCase();
    let description = obj.description.toLowerCase();

    //console.log(name)
    //console.log(term)

    if (name.includes(term) || description.includes(term)) {
      //console.log(obj);
      results = obj;
    }
  })
  return results;
}

export default async function handler(req, res) {

  let searchValues = req.query.value.split(' ');
  let list = [];
  let results = [];


  await db.queryAsync(`SELECT * FROM barkschema.Events`)
    .then((response) => {
      let eventInfo = response[0].rows;
      eventInfo['table'] = 'Events';
      list = [...list, ...eventInfo];
    })
    .catch((err) => {
      console.log(`404, data not found`);
      res.status(404).send(err);
    })


  // if (groupSearch) {
  //   await db.queryAsync(`SELECT * FROM barkschema.Groups`)
  //   .then((response) => {
  //     let groupInfo = response[0].rows;
  //     groupInfo['table'] = 'Groups';
  //     list = [...list, ...groupInfo];
  //   })
  //   .catch((err) => {
  //     console.log(`404, data not found`);
  //     res.status(404).send(err);
  //   })
  // }

  Promise.all(list)
    .then(() => {
      list.map((item) => {
        let result = searchItems(item, searchValues);
        if (result) {
          results = [...results, result];
        }
      })
    })
    .then(() => {
      if (results.length > 0) {
        //console.log(results);
        res.status(200).send(results);
      } else {
        res.status(404).send('Results not found')
      }
    })


}