import { useContext } from "react";
import CharacterContext, { Character } from "../contexts/CharacterContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FlipMove from "react-flip-move";

const InitiativeHUD = (): JSX.Element => {
  const { characters } = useContext(CharacterContext);

  const sortedCharacters = [...characters].sort(
    (a: Character, b: Character) =>
      b.initiativeRoll +
      b.initiativeModifier -
      (a.initiativeRoll + a.initiativeModifier)
  );

  return (
    <FlipMove className="hud">
      {sortedCharacters.map((char: Character) => (
        <div key={char.id} className={`character-hud ${char.type}`}>
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                {char.name}
                <br />
                {char.initiativeRoll + char.initiativeModifier}
              </Tooltip>
            }>
            <img src={char.imageUrl} alt={char.name} draggable="false" />
          </OverlayTrigger>
        </div>
      ))}
    </FlipMove>
  );
};

export default InitiativeHUD;
