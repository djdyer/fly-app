const API_KEY = "AIzaSyD-RuWSCkmZwh_RKF5GZKhWWkbbwVKkrdQ";

// const address = document.getElementById("location").innerHTML;
// console.log("address:", address);

const address = "Atlanta";
console.log("MAP JS CONNECTED");

async function mapApiCall() {
  try {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

    const response = await fetch(url);

    console.log({ response });
    const data = await response.json();
    console.log({ data });
    let coords = {
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng,
    };
    console.log({ coords });
    return coords;
  } catch (error) {
    console.log(error);
  }
}

let map;

async function initMap() {
  const coords = await mapApiCall();

  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(coords.lat, coords.lng),
    zoom: 9,
    disableDefaultUI: true,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#212121",
          },
        ],
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#212121",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#bdbdbd",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#181818",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#1b1b1b",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#2c2c2c",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8a8a8a",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#373737",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#3c3c3c",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#4e4e4e",
          },
        ],
      },
      {
        featureType: "road.local",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#3d3d3d",
          },
        ],
      },
    ],
  });

  const icon = "../assets/icons/location.png";

  const airports = [
    {
      position: new google.maps.LatLng(33.6404, -84.4198),
      type: "info",
    },
    {
      position: new google.maps.LatLng(33.9779, -83.9567),
      type: "info",
    },
    {
      position: new google.maps.LatLng(33.3543, -84.5698),
      type: "info",
    },
    {
      position: new google.maps.LatLng(33.8768, -84.3079),
      type: "info",
    },
  ];

  // Create markers
  for (let i = 0; i < airports.length; i++) {
    const marker = new google.maps.Marker({
      position: airports[i].position,
      icon: icon,
      map: map,
    });
  }
}
