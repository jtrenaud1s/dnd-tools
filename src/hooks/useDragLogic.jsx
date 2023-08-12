import { useContext, useRef } from "react";
import CharacterContext from "../contexts/CharacterContext";
import MapBoundsContext from "../contexts/MapBoundsContext";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";
import L from "leaflet";

const useDragLogic = (character, icon) => {
  const { bounds } = useContext(MapBoundsContext);
  const { characters, setCharacters } = useContext(CharacterContext);
  const { selectedCharacterId, setSelectedCharacterId } = useContext(
    SelectedCharacterContext
  );
  const isDragging = useRef(false);

  const handleDragStart = () => {
    if (!isDragging) isDragging.current = true;
    console.log("dragging");
  };

  const handleDrag = (event) => {
    console.log("drag");
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
    console.log("drag end");
    L.DomEvent.stopClickPropagation(event);
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
    setTimeout(() => {
      isDragging.current = false;
    }, 500);
  };

  const handleClick = (event) => {
    console.log("click", isDragging);
    L.DomEvent.stopPropagation(event);
    if (isDragging.current) {
      return;
    }
    console.log("making selectioin");
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
