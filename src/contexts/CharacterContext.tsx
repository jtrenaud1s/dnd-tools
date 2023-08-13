/* eslint-disable react/prop-types */
// src/contexts/CharacterContext.jsx
import { createContext, useState, useEffect, ReactNode } from "react";

export interface Position {
  lat: number;
  lng: number;
}

export interface Character {
  id: string;
  name: string;
  position: Position;
  type: string;
  initiativeModifier: number;
  initiativeRoll: number;
  imageUrl: string;
}

export interface CharacterContextProps {
  children: ReactNode;
}

export interface CharacterContextValue {
  characters: Character[];
  addCharacter: (character: Character) => void;
  editCharacter: (updatedCharacter: Character) => void;
  removeCharacter: (characterId: string) => void;
  setCharacters: (characters: Character[]) => void;
}

const CharacterContext = createContext<CharacterContextValue>({
  characters: [],
  addCharacter: () => {},
  editCharacter: () => {},
  removeCharacter: () => {},
  setCharacters: () => {},
});

export const CharacterProvider = ({
  children,
}: CharacterContextProps): JSX.Element => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const addCharacter = (character: Character) => {
    console.log(character);
    setCharacters((prev) => [...prev, character]);
  };

  const editCharacter = (updatedCharacter: Character) => {
    const newCharacters = characters.map((char) =>
      char.id === updatedCharacter.id ? updatedCharacter : char
    );
    setCharacters(newCharacters);
  };

  const removeCharacter = (characterId: string) => {
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

  const value: CharacterContextValue = {
    characters,
    addCharacter,
    editCharacter,
    removeCharacter,
    setCharacters,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
