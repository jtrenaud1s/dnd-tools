/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Marker, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import MapContext from "../contexts/MapContext";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";
import CharacterContext from "../contexts/CharacterContext";

const DraggableMarker = ({ character }) => {
  // eslint-disable-next-line no-unused-vars
  const [mapUrl, setMapUrl, bounds, setBounds] = useContext(MapContext);
  const [characters, setCharacters] = useContext(CharacterContext);
  const map = useMap();

  const [selectedCharacterId, setSelectedCharacterId] = useContext(
    SelectedCharacterContext
  );

  const isSelected = character.id === selectedCharacterId;

  const icon = L.icon({
    iconUrl: character.imageUrl,
    iconSize: [100, 100],
    className: isSelected
      ? character.type === "Friendly"
        ? "friendly-border"
        : "enemy-border"
      : "",
  });

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
  
  return (
    <Marker
      position={character.position || map.getCenter()}
      draggable={true}
      icon={icon}
      eventHandlers={{
        drag: handleDrag,
        dragend: handleDragEnd,
        click: () => {
          if (selectedCharacterId === character.id) {
            setSelectedCharacterId(null);
            return;
          }
          setSelectedCharacterId(character.id);
        },
      }}>
      <Tooltip permanent direction="top" offset={[0, -50]}>
        <span
          style={{
            backgroundColor: "white",
            padding: "2px 5px",
            borderRadius: "3px",
          }}>
          {character.name}
        </span>
      </Tooltip>
    </Marker>
  );
};

export default DraggableMarker;
