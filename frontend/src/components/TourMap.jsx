import React, { useRef, useEffect, useState, useContext } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { TourContext } from "../../context/TourContext";
import { Grid, List, ListItem, ListItemText } from "@mui/material";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const TourMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-114.0571411);
  const [lat, setLat] = useState(51.0453775);
  const [zoom, setZoom] = useState(13);
  const { tourLocations, setTourLocations } = useContext(TourContext);
  const myGeojson = convertToGeojson(tourLocations);
  const routesURL = getRouteURL(tourLocations);
  const [routeData, setRouteData] = useState();
  // let routeGeojson;

  // const getRouteGeojson = async () => (routeGeojson = await fetch(getRouteURL));

  // getRouteGeojson();
  // console.log(routeGeojson);

  useEffect(() => {
    const getRouteData = async () => {
      const response = await fetch(routesURL);
      const data = await response.json();
      setRouteData(data);
    };
    getRouteData();

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
    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        // data: routeGeojson,
        data: routesURL,
      });
      map.current.addSource("art", {
        type: "geojson",
        data: myGeojson,
      });
      map.current.loadImage("icon.png", (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.current.addImage("icon", image);
      });
      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        paint: {
          "line-color": "rgb(53, 4, 70)",
          "line-width": 5,
          "line-opacity": 0.75,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
      });
      map.current.addLayer(
        {
          id: "routearrows",
          type: "symbol",
          source: "route",
          layout: {
            "symbol-placement": "line",
            "text-field": "▶",
            "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
            "symbol-spacing": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              30,
              22,
              160,
            ],
            "text-keep-upright": false,
          },
          paint: {
            "text-color": "rgb(53, 4, 70)",
            "text-halo-color": "hsl(55, 11%, 96%)",
            "text-halo-width": 3,
          },
        },
        "waterway-label"
      );
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
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.short_desc;
      const title = e.features[0].properties.title;
      const address = e.features[0].properties.address;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          "<h2>" +
            title +
            "</h2><h3>" +
            address +
            "</h3><p>" +
            description +
            "</p>"
        )
        .addTo(map.current);
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

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={8}>
        <div ref={mapContainer} className="map-container" />
      </Grid>
      <Grid item xs={4}>
        <h2>Tour Stops:</h2>
        {tourLocations.length === 0 && <p>No locations added.</p>}
        <List>
          {tourLocations.map((location) => (
            <ListItem>
              <ListItemText
                primary={location.properties.title}
                secondary={location.properties.address}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default TourMap;

const convertToGeojson = (tourLocations) => {
  const toReturn = {
    type: "FeatureCollection",
    features: tourLocations,
  };
  return toReturn;
};

const getRouteURL = (tourLocations) => {
  let coordString = "/api/route/";
  for (let i in tourLocations) {
    let tempURL = coordString;
    let newCoord =
      tourLocations[i].geometry.coordinates[0] +
      "%2C" +
      tourLocations[i].geometry.coordinates[1];
    coordString = tempURL + newCoord;
    if (i < tourLocations.length - 1) {
      let temp = coordString;
      coordString = temp + "%3B";
    }
  }
  return coordString;
};
