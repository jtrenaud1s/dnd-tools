/* eslint-disable react/prop-types */
// src/contexts/CharacterContext.jsx
import { createContext, useState, useEffect } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  const addCharacter = (character) => {
    console.log(character);
    setCharacters((prev) => [...prev, character]);
  };

  const editCharacter = (updatedCharacter) => {
    const newCharacters = characters.map((char) =>
      char.id === updatedCharacter.id ? updatedCharacter : char
    );
    setCharacters(newCharacters);
  };

  const removeCharacter = (characterId) => {
    setCharacters((prev) => prev.filter((char) => char.id !== characterId));
  };

  useEffect(() => {
    const storedCharacters = localStorage.getItem("characters");
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        addCharacter,
        editCharacter,
        removeCharacter,
        setCharacters,
      }}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
