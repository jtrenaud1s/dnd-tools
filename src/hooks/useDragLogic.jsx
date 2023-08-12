import { useContext, useRef } from "react";
import CharacterContext from "../contexts/CharacterContext";
import MapBoundsContext from "../contexts/MapBoundsContext";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";

const useDragLogic = (character, icon) => {
  const { bounds } = useContext(MapBoundsContext);
  const { characters, setCharacters } = useContext(CharacterContext);
  const { selectedCharacterId, setSelectedCharacterId } = useContext(
    SelectedCharacterContext
  );

  const dragEndTime = useRef(null);

  const handleDragStart = () => {
  };

  const handleDrag = (event) => {
    const marker = event.target;
    let newPos = marker.getLatLng();

    const halfIconWidth = icon.options.iconSize[0] / 2 - 4;
    const halfIconHeight = icon.options.iconSize[1] / 2 - 4;

    // Check for out of bounds and adjust the position accordingly
    if (newPos.lat - halfIconHeight < bounds[0][0]) {
      newPos.lat = bounds[0][0] + halfIconHeight;
    } else if (newPos.lat + halfIconHeight > bounds[1][0]) {
      newPos.lat = bounds[1][0] - halfIconHeight;
    }

    if (newPos.lng - halfIconWidth < bounds[0][1]) {
      newPos.lng = bounds[0][1] + halfIconWidth;
    } else if (newPos.lng + halfIconWidth > bounds[1][1]) {
      newPos.lng = bounds[1][1] - halfIconWidth;
    }

    marker.setLatLng(newPos);
  };

  const handleDragEnd = (event) => {
    dragEndTime.current = Date.now();
    const marker = event.target;
    const newPos = marker.getLatLng();
    const updatedCharacters = characters.map((char) => {
      if (char.id === character.id) {
        return { ...char, position: newPos };
      }
      return char;
    });

    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  };

  const handleClick = () => {
    if (Date.now() - dragEndTime.current < 200) {
      // 200ms threshold
      return;
    }
    if (selectedCharacterId === character.id) {
      setSelectedCharacterId(null);
      return;
    }
    setSelectedCharacterId(character.id);
  };

  return {
    handleDrag,
    handleDragEnd,
    handleClick,
    handleDragStart,
  };
};

export default useDragLogic;
