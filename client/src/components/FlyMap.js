import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../style/map.css";

const styles = require("../assets/styles/backgroundmap");

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 33.515,
  lng: -84.388,
};

export default function FlyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_FLY_API_KEY,
  });

  const mapRef = useRef(null);
  const [position, setPosition] = useState(center);

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;

    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  const icon = require("../assets/icons/location.png");

  const airports = [
    {
      lat: 33.6404,
      lng: -84.4198,
    },
    {
      lat: 33.9779,
      lng: -83.9567,
    },
    {
      lat: 33.3543,
      lng: -84.5698,
    },
  ];

  //////////////

  return isLoaded ? (
    <div className="mapStyle">
      <GoogleMap
        onLoad={handleLoad}
        center={position}
        onDragEnd={handleCenter}
        options={{
          styles,
          disableDefaultUI: true,
          draggable: false,
        }}
        mapContainerStyle={containerStyle}
        zoom={8}
      >
        {airports.map((marker) => (
          <Marker key={marker.lat + marker.lng} position={marker} icon={icon} />
        ))}
      </GoogleMap>
    </div>
  ) : null;
}
