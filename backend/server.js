import express from "express";
import dotenv from "dotenv";
import path from "path";
import { geojsonRouter } from "./geojsonRouter.js";
import { routeRouter } from "./routeRouter.js";

dotenv.config();

const PORT = process.env.PORT || 4001;
const app = express();
app.use(express.json());
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use(express.static("../frontend/dist"));

app.use("/api/geojson", geojsonRouter);
app.use("/api/route", routeRouter);
app.get("*", (req, res) =>
  res.sendFile(path.join(path.resolve(), "frontend/dist/index.html"))
);
