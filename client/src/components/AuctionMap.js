import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../style/auctionMap.css";

const styles = require("../assets/styles/backgroundmap");

const containerStyle = {
  height: "150px",
};

const center = {
  lat: 33.749,
  lng: -84.388,
};

export default function AuctionMap() {
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
      lat: 33.749,
      lng: -84.388,
    },
  ];

  return isLoaded ? (
    <div className="auctionMapStyle">
      <GoogleMap
        onLoad={handleLoad}
        center={position}
        onDragEnd={handleCenter}
        options={{ styles, disableDefaultUI: true, draggable: false }}
        mapContainerStyle={containerStyle}
        zoom={11}
      >
        {airports.map((marker) => (
          <Marker key={marker.lat + marker.lng} position={marker} icon={icon} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <>Loading map .....</>
  );
}
