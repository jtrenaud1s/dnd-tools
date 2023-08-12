import { useContext } from "react";
import CharacterContext from "../contexts/CharacterContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FlipMove from "react-flip-move";

const InitiativeHUD = () => {
  const { characters } = useContext(CharacterContext);

  const sortedCharacters = [...characters].sort(
    (a, b) =>
      b.currentInitiative +
      b.initiativeModifier -
      (a.currentInitiative + a.initiativeModifier)
  );

  return (
    <FlipMove className="hud">
      {sortedCharacters.map((char) => (
        <div key={char.id} className={`character-hud ${char.type}`}>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                {char.name}
                <br />
                {char.currentInitiative + char.initiativeModifier}
              </Tooltip>
            }>
            <img src={char.imageUrl} alt={char.name} />
          </OverlayTrigger>
        </div>
      ))}
    </FlipMove>
  );
};

export default InitiativeHUD;
