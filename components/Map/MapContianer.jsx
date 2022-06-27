import React, { useState, useContext, createContext, useRef} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Map from './Map.jsx';


export default function MapContainer() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDMC1W3SHcAZGQEivecuyHQOCmeahkwlA4",
  });

  const mapStyle = {
    height: "94%",
    width: "100%"
  };

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;

}