/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import board from "../assets/board.jpeg";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapUrl, setMapUrl] = useState(localStorage.getItem("mapUrl") || board);
  const [bounds, setBounds] = useState(null);

  return (
    <MapContext.Provider value={[mapUrl, setMapUrl, bounds, setBounds]}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;
