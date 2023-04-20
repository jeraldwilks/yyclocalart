import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// import "./App.css";
import Map from "./components/Map";
import About from "./components/About";
// import TourMap from "./TourMap";
// import "bootstrap/dist/css/bootstrap.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar.jsx";

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
