/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import board from "../assets/board.jpeg";

const MapURLContext = createContext();

export const MapURLProvider = ({ children }) => {
  const [mapUrl, setMapUrl] = useState(localStorage.getItem("mapUrl") || board);
  const [mapCenter, setMapCenter] = useState({ lat: 50, lng: 50 });


  return (
    <MapURLContext.Provider value={{mapUrl, setMapUrl, mapCenter, setMapCenter}}>
      {children}
    </MapURLContext.Provider>
  );
};

export default MapURLContext;
