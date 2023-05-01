import React from "react";
import { createContext, useState } from "react";

export const TourContext = createContext();

export default function TourContextProvider({ children }) {
  const [tourLocations, setTourLocations] = useState([]);
  return (
    <TourContext.Provider value={{ tourLocations, setTourLocations }}>
      {children}
    </TourContext.Provider>
  );
}
