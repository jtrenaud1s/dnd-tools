import { useEffect, useContext } from "react";
import CharacterContext, { Character } from "../contexts/CharacterContext";
import MapURLContext from "../contexts/MapURLContext";

export interface UseMapInitializationProps {
  mapRef: React.RefObject<L.Map>;
  mapUrl: string;
}

const useMapInitialization = ({
  mapRef,
  mapUrl,
}: UseMapInitializationProps): Character[] => {
  const { characters, setCharacters } = useContext(CharacterContext);
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
