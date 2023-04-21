import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import TourContextProvider from "../context/TourContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TourContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TourContextProvider>
  </React.StrictMode>
);
