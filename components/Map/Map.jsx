import React, { useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

export default function Map() {

  let [zoom, setZoom] = useState(5);
  let [center, setCenter] = useState({ lat: 43.4955876, lng: -116.486516});
  let [mapStyle, setMapStyle] = useState({ height: "94%", width: "100%"});

  return (
    <GoogleMap mapContainerStyle={mapStyle} zoom={zoom} center={center} />
  )
}