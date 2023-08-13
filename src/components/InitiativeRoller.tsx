import { useContext } from "react";
import CharacterContext, { Character } from "../contexts/CharacterContext";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";
import { Button } from "react-bootstrap";

const InitiativeRoller = (): JSX.Element => {
  const { selectedCharacterId } = useContext(SelectedCharacterContext);
  const { characters, setCharacters } = useContext(CharacterContext);

  const rollD20 = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const updatedCharacters = characters.map((char: Character) => {
      if (char.id === selectedCharacterId) {
        return { ...char, initiativeRoll: roll };
      }
      return char;
    });
    setCharacters(updatedCharacters);
  };

  const selectedCharacter = characters.find(
    (char: Character) => char.id === selectedCharacterId
  );

  return (
    <>
      <Button
        variant="primary"
        onClick={rollD20}
        disabled={!selectedCharacterId}>
        Roll Initiative
      </Button>
      {selectedCharacter && (
        <h1>
          {selectedCharacter.name} rolled a {selectedCharacter.initiativeRoll}
        </h1>
      )}
    </>
  );
};

export default InitiativeRoller;
