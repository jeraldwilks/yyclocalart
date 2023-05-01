import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Map from "./components/Map";
import About from "./components/About";
import Footer from "./components/Footer";
import TourMap from "./components/TourMap";
import ResponsiveAppBar from "./components/ResponsiveAppBar.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4"
    },
    secondary: {
      main: "#f50057"
    }
  }
});

function App() {
  return (
    <div className="fullscreen">
      <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
        <Route path="/tourmap" element={<TourMap />} />
      </Routes>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default App;
