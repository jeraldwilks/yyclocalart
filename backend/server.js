import express from "express";
import dotenv from "dotenv";
import { geojsonRouter } from "./geojsonRouter.js";

dotenv.config();

const PORT = process.env.PORT || 4001;
const app = express();
app.use(express.json());
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use(express.static("public"));

app.use("/api/geojson", geojsonRouter);
