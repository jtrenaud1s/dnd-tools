import { createContext, useState, ReactNode } from "react";
import board from "../assets/board.jpeg";

export interface MapURLContextValue {
  mapUrl: string;
  setMapUrl: (url: string) => void;
  mapCenter: { lat: number; lng: number };
  setMapCenter: (center: { lat: number; lng: number }) => void;
}

const MapURLContext = createContext<MapURLContextValue>({
  mapUrl: board,
  setMapUrl: () => {},
  mapCenter: { lat: 50, lng: 50 },
  setMapCenter: () => {},
});

export interface MapURLProviderProps {
  children: ReactNode;
}

export const MapURLProvider = ({
  children,
}: MapURLProviderProps): JSX.Element => {
  const [mapUrl, setMapUrl] = useState<string>(
    localStorage.getItem("mapUrl") || board
  );
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 50,
    lng: 50,
  });

  const value: MapURLContextValue = {
    mapUrl,
    setMapUrl,
    mapCenter,
    setMapCenter,
  };

  return (
    <MapURLContext.Provider value={value}>{children}</MapURLContext.Provider>
  );
};

export default MapURLContext;
