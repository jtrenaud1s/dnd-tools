/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const MapBoundsContext = createContext();

export const MapBoundsProvider = ({ children }) => {
  const [bounds, setBounds] = useState(null);

  return (
    <MapBoundsContext.Provider value={{bounds, setBounds}}>
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContext;
