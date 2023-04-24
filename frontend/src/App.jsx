import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Map from "./components/Map";
import About from "./components/About";
import TourMap from "./components/TourMap";
import ResponsiveAppBar from "./components/ResponsiveAppBar.jsx";

function App() {
  return (
    <div className="fullscreen">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="/tourmap" element={<TourMap />} />
      </Routes>
    </div>
  );
}

export default App;
