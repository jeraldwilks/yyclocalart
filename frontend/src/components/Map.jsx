import React, { useRef, useEffect, useState, useContext } from "react";
import "./Map.css";
import mapboxgl, { Popup } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "react-router-dom";
import { TourContext } from "../../context/TourContext";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Grid, List, ListItem, ListItemText } from "@mui/material";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-114.0571411);
  const [lat, setLat] = useState(51.0453775);
  const [zoom, setZoom] = useState(13);
  const { tourLocations, setTourLocations } = useContext(TourContext);
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
      .addControl(new mapboxgl.NavigationControl())
      .addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        }),
        "top-left"
      );
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
          "icon-size": 0.09,
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
    if (tourLocations.indexOf(selectedLocation) == -1) {
      setTourLocations((prevArray) => [...prevArray, selectedLocation]);
    }
  };

  const removeLocation = (location) => {
    setTourLocations((current) => current.filter((loc) => loc != location));
  };

  return (
    <div className="fullpage">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={8}>
          <div ref={mapContainer} className="map-container" />
        </Grid>
        <Grid item xs={4}>
          <h2>Selected Location:</h2>
          {selectedLocation == null && <p>No location selected</p>}
          {selectedLocation != null && (
            <>
              <h3>{selectedLocation.properties.title}</h3>
              <p>{selectedLocation.properties.address}</p>
              {selectedLocation.properties.short_desc}
              <p>
                {tourLocations.length <= 25 && (
                  <button onClick={addToTour}>Add to Tour</button>
                )}
              </p>
            </>
          )}
          <h2>Tour Stops:</h2>
          {tourLocations.length === 0 && <p>No locations added.</p>}
          <List>
            {tourLocations.map((location) => (
              <ListItem>
                <ListItemText primary={location.properties.title} />
                <button onClick={() => removeLocation(location)}>Remove</button>
              </ListItem>
            ))}
          </List>
          {tourLocations.length >= 2 && (
            <Link to="/tourmap">
              <button>Create Tour</button>
            </Link>
          )}
        </Grid>
      </Grid>
      <a className="iconcredit" href="https://www.flaticon.com/free-icons/paint" title="paint icons">Paint icons created by Freepik - Flaticon</a>
    </div>
  );
};

export default Map;
