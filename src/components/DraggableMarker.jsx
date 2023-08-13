/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Marker, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import useDragLogic from "../hooks/useDragLogic";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";

const DraggableMarker = ({ character }) => {
  // eslint-disable-next-line no-unused-vars
  const map = useMap();

  const { selectedCharacterId } = useContext(SelectedCharacterContext);
  const isSelected = character.id === selectedCharacterId;

  const icon = L.icon({
    iconUrl: character.imageUrl,
    iconSize: [100, 100],
    className:
      "circle " +
      (isSelected
        ? character.type === "Friendly"
          ? "friendly-border"
          : "enemy-border"
        : ""),
  });

  const { handleDrag, handleDragEnd, handleClick, handleDragStart } =
    useDragLogic(character, icon);

  return (
    <Marker
      position={character.position || map.getCenter()}
      draggable={true}
      icon={icon}
      eventHandlers={{
        drag: handleDrag,
        dragend: handleDragEnd,
        click: handleClick,
        dragstart: handleDragStart,
      }}
      autoPan={true}>
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
