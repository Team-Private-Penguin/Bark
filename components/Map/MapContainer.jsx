import React, { useState, useEffect, useContext, createContext } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Map from './Map.jsx';
import { Drawer, Button, LoadingOverlay } from '@mantine/core';
import MapDrawerCard from './MapDrawerCard.jsx';
import Navbar from '../Navbar.js';

export const MapContainerState = createContext();

export default function MapContainer() {

  let [opened, setOpened] = useState(false);
  let [title, setTitle] = useState('Map');
  let [searchValue, setSearchValue] = useState('');
  let [markers, setMarkers] = useState([]);
  let [drawerCards, setDrawerCards] = useState([]);
  let [center, setCenter] = useState({ lat: 43.4955876, lng: -116.486516 });
  let [rsvp, setRSVP] = useState(true);




  return (
    <MapContainerState.Provider value={{ opened, setOpened, rsvp, setRSVP, center, setCenter, searchValue, markers, setMarkers, drawerCards, setDrawerCards }}>
      <Drawer key='MapDrawerLeft' size="lg" withOverlay={false} closeOnEscape="true" closeOnClickOutside={true} padding="xl" opened={opened} onClose={() => { setOpened(false); }} title={title}>
        {
          drawerCards.map((card) => {
            return (
              <MapDrawerCard card={card} key={card.lat} />
            )
          })
        }
      </Drawer>
      <Map />
    </MapContainerState.Provider>
  )

}