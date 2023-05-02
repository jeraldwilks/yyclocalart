import express from "express";
import dotenv from "dotenv";

dotenv.config();

export const routeRouter = express.Router();

routeRouter.get("/:coordString", async (req, res) => {
  let queryString = getURL(req.params.coordString);
  try {
    let routeJSON = await fetch(queryString).then(function (response) {
      return response.json();
    });
    // let routeGeoJSON = convertToGeoJSON(routeJSON);
    console.log(routeJSON.routes[0].legs[0].steps);
    res.send(routeJSON);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

const getURL = (coords) => {
  let directionsURL = "https://api.mapbox.com/directions/v5/mapbox/walking/";
  return (
    directionsURL +
    coords +
    "?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=" +
    process.env.MAP_TOKEN
  );
};

const convertToGeoJSON = (routejson) => {
  const data = routejson.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route,
    },
  };
  return geojson;
};
