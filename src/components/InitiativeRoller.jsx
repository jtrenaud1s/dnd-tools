import { useContext } from "react";
import CharacterContext from "../contexts/CharacterContext";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";
import { Button } from "react-bootstrap";

const InitiativeRoller = () => {
  const { selectedCharacterId } = useContext(SelectedCharacterContext);
  const { characters, setCharacters } = useContext(CharacterContext);

  const rollD20 = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const updatedCharacters = characters.map((char) => {
      if (char.id === selectedCharacterId) {
        return { ...char, currentInitiative: roll };
      }
      return char;
    });
    setCharacters(updatedCharacters);
  };

  const selectedCharacter = characters.find(
    (char) => char.id === selectedCharacterId
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
          {selectedCharacter.name} rolled a {selectedCharacter.currentInitiative}
        </h1>
      )}
    </>
  );
};
export default InitiativeRoller;
