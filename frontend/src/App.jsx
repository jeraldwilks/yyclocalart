import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// import "./App.css";
import Map from "./components/Map";
import AboutUs from "./components/AboutUs";
// import TourMap from "./TourMap";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
