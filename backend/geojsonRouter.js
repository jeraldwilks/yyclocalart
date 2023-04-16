import express from "express";
// import { model } from
import dotenv from "dotenv";

dotenv.config();
const calgaryURL =
  "https://data.calgary.ca/resource/2kp2-hsy7.geojson?$$app_token=" +
  process.env.CALGARY_TOKEN;

export const geojsonRouter = express.Router();

geojsonRouter.get("/", async (req, res) => {
  try {
    console.log("test...");
    let geoJSON = await fetch(calgaryURL).then(function (response) {
      return response.json();
    });
    res.send(geoJSON);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
});
