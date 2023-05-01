import express from "express";
import dotenv from "dotenv";

dotenv.config();
const calgaryURL =
  "https://data.calgary.ca/resource/2kp2-hsy7.geojson?$$app_token=" +
  process.env.CALGARY_TOKEN;

export const geojsonRouter = express.Router();

let geoJSON = null;

geojsonRouter.get("/", async (req, res) => {
  try {
    if (geoJSON == null) {
      geoJSON = await fetch(calgaryURL).then(function (response) {
        return response.json();
      });
    }
    res.send(geoJSON);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});

// Empty saved geoJSON once per hour
setInterval(() => (geoJSON = null), 3600000);
