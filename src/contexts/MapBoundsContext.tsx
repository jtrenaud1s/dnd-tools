import { createContext, useState, ReactNode } from "react";

export interface MapBoundsContextValue {
  bounds: null | any;
  setBounds: (bounds: any) => void;
}

const MapBoundsContext = createContext<MapBoundsContextValue>({
  bounds: null,
  setBounds: () => {},
});

export interface MapBoundsProviderProps {
  children: ReactNode;
}

export const MapBoundsProvider = ({
  children,
}: MapBoundsProviderProps): JSX.Element => {
  const [bounds, setBounds] = useState<null | any>(null);

  return (
    <MapBoundsContext.Provider value={{ bounds, setBounds }}>
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContext;
