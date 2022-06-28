import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { Drawer, Button, Group, Stack, TextInput } from '@mantine/core';
import { MapContainerState } from './MapContianer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Map() {

  let { opened, setOpened, markers, center, drawerCards, setDrawerCards } = useContext(MapContainerState);
  let [searchResults, setSearchResults] = useState([]);

  let searchEvent = (searchValue) => {
    setSearchResults(searchResults = []);

    searchValue = searchValue.toLowerCase();

    drawerCards.map((card) => {
      if (card.name.toLowerCase().includes(searchValue) || card.description.toLowerCase().includes(searchValue)) {
        setSearchResults(searchResults = [...searchResults, card])
      }
    });

    if (searchResults.length > 0) {
      setDrawerCards(searchResults);
      setOpened(true);
    }
  }

  // Here is where we will set the map center and markers based on incoming context
  useEffect(() => {
    let keyDownHandler = (event) => {
      console.log(`User Pressed: ${event.key}`);

      if (event.key === 'Enter') {
        event.preventDefault();
        searchEvent(document.getElementById('searchValue').value);
      }
    };

  document.addEventListener('keydown', keyDownHandler);

  return () => {
    document.removeEventListener('keydown', keyDownHandler);
  }
  }, [])


  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%"}}
        zoom={11} center={center}
        >
        <TextInput
        id="searchValue"
        className="absolute w-[400px] top-3 left-60"
        placeholder={`Search Events`}
        radius="md"
        >
        </TextInput><FontAwesomeIcon className="z-10" icon={faMagnifyingGlass} />
          {
            markers.map((marker) => {
              return <Marker position={marker}/>
            })
          }
        </GoogleMap>
      </LoadScript>
    </>
  )
}