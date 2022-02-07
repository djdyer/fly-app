import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const styles = require("../assets/styles/backgroundmap");

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 33.749,
  lng: -84.388,
};

export default function FlyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD-RuWSCkmZwh_RKF5GZKhWWkbbwVKkrdQ",
  });

  // const [map, setMap] = useState(null);

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null);
  // }, []);


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
    {
      lat: 33.8768,
      lng: -84.3079,
    },
  ];


  //////////////

  return isLoaded ? (<>
    <GoogleMap
      onLoad={handleLoad}
      center={position}
      onDragEnd={handleCenter}
      // className={mapStyle}
      //defaultCenter={{ lat: 33.749, lng: -84.388 }}
      options={{ styles, disableDefaultUI: true }}
      mapContainerStyle={containerStyle}
      zoom={9}
      // onUnmount={onUnmount}

    > 
    {airports.map((marker) => (  
    <Marker position={marker}/>))}
    </GoogleMap>

          </>

  ) : (
    <>Loadind map .....</>
  );
}
