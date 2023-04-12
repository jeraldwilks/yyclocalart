import React, { useRef, useEffect, useState } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-114.0571411);
  const [lat, setLat] = useState(51.0453775);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
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
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.short_desc;
      const title = e.features[0].properties.title;
      const address = e.features[0].properties.address;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
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
    map.current.on("mouseenter", "places", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.current.on("mouseleave", "places", () => {
      map.current.getCanvas().style.cursor = "";
    });
  });
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
