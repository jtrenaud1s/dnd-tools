/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const SelectedCharacterContext = createContext();

export const SelectedCharacterProvider = ({ children }) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  return (
    <SelectedCharacterContext.Provider
      value={{ selectedCharacterId, setSelectedCharacterId }}>
      {children}
    </SelectedCharacterContext.Provider>
  );
};

export default SelectedCharacterContext;
