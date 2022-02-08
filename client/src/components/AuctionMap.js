import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "./auctionMap.css";

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
    googleMapsApiKey: "AIzaSyD-RuWSCkmZwh_RKF5GZKhWWkbbwVKkrdQ",
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

  //const icon = "../assets/icons/location.png";

  const airports = [
    {
      lat: 33.749,
      lng: -84.388,
    },
  ];

  return isLoaded ? (
    <div className="mapStyle">
      <GoogleMap
        onLoad={handleLoad}
        center={position}
        onDragEnd={handleCenter}
        // className={mapStyle}
        //defaultCenter={{ lat: 33.749, lng: -84.388 }}
        options={{ styles, disableDefaultUI: true }}
        mapContainerStyle={containerStyle}
        zoom={12}
        // onUnmount={onUnmount}
      >
        {airports.map((marker) => (
          <Marker key={marker.lat + marker.lng} position={marker} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <>Loading map .....</>
  );
}
