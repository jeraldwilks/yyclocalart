import express from "express";
// import { model } from
import dotenv from "dotenv";

dotenv.config();
var calgaryURL =
  "https://data.calgary.ca/resource/2kp2-hsy7.geojson?$$app_token=" +
  process.env.CALGARY_TOKEN;

export const geojsonRouter = express.Router();

geojsonRouter.get("/", async (req, res) => {});

var handleGeoJSON = function (data) {
  // data is the JSON parsed into a JS object
  console.log(data);
};

fetch(calgaryURL)
  .then(function (response) {
    return response.json();
  })
  .then(handleGeoJSON);
