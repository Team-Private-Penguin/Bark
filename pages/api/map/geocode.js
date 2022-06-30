import db from "../db";
import axios from 'axios';
require('dotenv').config();


// this end point will respond with the lat and lng in the following format at response.data ==> {lat: NUMBER, lng: NUMBER}
export default async function handler(req, res) {
  let addressQueryString = req.query.address.split(' ').join('+');

  await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressQueryString}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    .then((response) => {
      res.status(200).send(response.data.results[0].geometry.location);
    })
}
