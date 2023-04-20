import React from "react";
// import "./App.css";
import Map from "./Map";
import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx"
// import TourMap from "./TourMap";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <br></br>
      <Map />
    </div>
  );
}

export default App;
