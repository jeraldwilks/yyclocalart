import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4001;
const app = express();
app.use(express.json());
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.use(express.static("public"));
