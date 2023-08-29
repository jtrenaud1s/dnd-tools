import L from "leaflet";
import { useContext } from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";
import useDragLogic from "../../hooks/useDragLogic";
import SelectedCharacterContext from "../../contexts/SelectedCharacterContext";
import { Character } from "../../contexts/CharacterContext";

const DraggableMarker = ({
  character,
}: {
  character: Character;
}): JSX.Element => {
  const map = useMap();

  const { selectedCharacterId } = useContext(SelectedCharacterContext);
  const isSelected = character.id === selectedCharacterId;

  const icon = L.icon({
    iconUrl: character.imageUrl,
    iconSize: [100, 100],
    className:
      "character " +
      (isSelected
        ? character.type === "Friendly"
          ? "friendly"
          : "enemy"
        : ""),
  });

  const { handleDrag, handleDragEnd, handleClick, handleDragStart } =
    useDragLogic({ character, icon });

  return (
    <Marker
      position={character.position || map.getCenter()}
      draggable={true}
      icon={icon}
      eventHandlers={{
        drag: handleDrag as L.LeafletEventHandlerFn,
        dragend: handleDragEnd as L.LeafletEventHandlerFn,
        click: handleClick,
        dragstart: handleDragStart,
      }}
      autoPan={true}>
      <Tooltip permanent direction="top" offset={[0, -50]}>
        <span className="name">{character.name}</span>
      </Tooltip>
    </Marker>
  );
};

export default DraggableMarker;
