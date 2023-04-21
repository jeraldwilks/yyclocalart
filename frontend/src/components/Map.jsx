import React, { useRef, useEffect, useState } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-114.0571411);
  const [lat, setLat] = useState(51.0453775);
  const [zoom, setZoom] = useState(13);
  const [tourLocations, setTourLocations] = useState([]);
  const [tourCoordinates, setTourCoordinates] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [lng, lat],
      zoom: zoom,
    })
      .addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true,
          showUserLocation: true,
        })
      )
      .addControl(new mapboxgl.NavigationControl());
    // .addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //   })
    // );
    map.current.on("load", () => {
      map.current.addSource("art", {
        type: "geojson",
        data: "/api/geojson",
      });
      map.current.loadImage("icon.png", (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.current.addImage("icon", image);
      });
      map.current.addLayer({
        id: "art",
        type: "symbol",
        source: "art",
        layout: {
          "icon-image": "icon",
          "icon-size": 0.075,
          "icon-allow-overlap": true,
          // get the title name from the source's "title" property
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
        },
      });
    });
    map.current.on("click", "art", (e) => {
      // Copy coordinates array.
      // console.log(e.features[0]);
      // const coordinates = e.features[0].geometry.coordinates.slice();
      // const description = e.features[0].properties.short_desc;
      // const title = e.features[0].properties.title;
      // const address = e.features[0].properties.address;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      // }
      setSelectedLocation(e.features[0]);
      //   new mapboxgl.Popup()
      //     .setLngLat(coordinates)
      //     .setHTML("<h2>" + title + "</h2>")
      //     .addTo(map.current);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.current.on("mouseenter", "art", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.current.on("mouseleave", "art", () => {
      map.current.getCanvas().style.cursor = "";
    });
  });

  const addToTour = () => {
    setTourLocations((prevArray) => [...prevArray, selectedLocation]);
    setTourCoordinates((prevArray) => [
      ...prevArray,
      selectedLocation.geometry.coordinates,
    ]);
  };

  //https://api.mapbox.com/directions/v5/{profile}/{coordinates}
  //https://api.mapbox.com/directions/v5/mapbox/walking/-114.0748777%2C51.0467936%3B-114.0573742%2C51.0448094%3B-114.0693834%2C51.055465?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.ey...

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <>
        <h1>Selected Location:</h1>
        {selectedLocation == null && <p>No location selected</p>}
        {selectedLocation != null && (
          <>
            <h2>{selectedLocation.properties.title}</h2>
            <h3>{selectedLocation.properties.address}</h3>
            {selectedLocation.properties.short_desc}
            <p>
              {tourLocations <= 25 && (
                <button onClick={addToTour}>Add to Tour</button>
              )}
            </p>
          </>
        )}
        <h1>Tour Stops:</h1>
        {tourLocations.length === 0 && <p>No locations added.</p>}
        <ul className="list-group">
          {tourLocations.map((location) => (
            <li
              className="list-group-item"
              key={location.properties.art_id}
              onClick={() => {
                console.log(location.geometry.coordinates);
              }}
            >
              {location.properties.title}
            </li>
          ))}
        </ul>
        {tourLocations.length >= 2 && (
          <Link to="/tourmap" state={{ tourLocations, tourCoordinates }}>
            <button>Create Tour</button>
          </Link>
        )}
      </>
    </div>
  );
};

export default Map;
