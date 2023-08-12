import { useEffect, useContext } from "react";
import CharacterContext from "../contexts/CharacterContext.jsx";
import MapURLContext from "../contexts/MapURLContext.jsx";

const useMapInitialization = (mapRef, mapUrl) => {
  const { characters, setCharacters } =
    useContext(CharacterContext);
  const { setMapCenter } = useContext(MapURLContext);

  useEffect(() => {
    if (!mapRef.current) return;
    const center = mapRef.current.getCenter();
    const updatedCharacters = characters.map((character) => ({
      ...character,
      position: center,
    }));
    setMapCenter(center);
    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  }, [mapUrl]);

  return characters;
};

export default useMapInitialization;
