import React, { useState, useEffect, useContext, createContext } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Map from './Map.jsx';
import { Drawer, Button, LoadingOverlay, ScrollArea } from '@mantine/core';
import MapDrawerCard from './MapDrawerCard.jsx';
import Navbar from '../Navbar.js';
import { useUser } from "@auth0/nextjs-auth0";
import axios from 'axios';

export const MapContainerState = createContext();

export default function MapContainer() {

  const { user } = useUser();
  let [opened, setOpened] = useState(false);
  let [title, setTitle] = useState('Map');
  let [searchValue, setSearchValue] = useState('');
  let [markers, setMarkers] = useState([]);
  let [drawerCards, setDrawerCards] = useState([]);
  let [center, setCenter] = useState({});
  let [rsvp, setRSVP] = useState(false);
  let [zoom, setZoom] = useState(11);
  let [eventId, setEventId] = useState();

  let userId = user?.sub.split("google-oauth2|")[1];
  if (!userId) {
    userId = user?.sub.split("auth0|")[1];
  }

  // Centering map on users zip
  useEffect(() => {
    axios.get(`/api/map?id=${userId}`)
      .then((response) => {
        axios.get(`/api/map/geocode?address=${response.data}`)
          .then((response) => {
            setCenter(center = response.data);
          })
      })

  }, [userId])


  return (
    <MapContainerState.Provider value={{ eventId, setEventId, zoom, setZoom, opened, setOpened, rsvp, setRSVP, center, setCenter, searchValue, markers, setMarkers, drawerCards, setDrawerCards }}>
      <Drawer key='MapDrawerLeft' size="lg" withOverlay={false} closeOnEscape="true" closeOnClickOutside={true} padding="xl" opened={opened} onClose={() => { setOpened(false); }} title={title}>
        <ScrollArea
              offsetScrollbars
              scrollbarSize={13}
              className="mt-2"
              style={{ height: "95vh" }}
            >
          {
            drawerCards.map((card) => {
              return (
                <MapDrawerCard card={card} key={card.lat} />
              )
            })
          }
        </ScrollArea>
      </Drawer>
      <Map />
    </MapContainerState.Provider>
  )

}