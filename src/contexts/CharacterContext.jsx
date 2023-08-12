/* eslint-disable react/prop-types */
// src/contexts/CharacterContext.jsx
import { createContext, useState, useEffect } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const storedCharacters = localStorage.getItem("characters");
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  console.log([characters, setCharacters]);
  return (
    <CharacterContext.Provider value={[characters, setCharacters]}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
