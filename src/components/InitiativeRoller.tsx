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
    <div className="flex justify-center flex-col items-center">
      <button
        className="bg-red-600 self-center text-white rounded px-4 py-1 mb-4"
        onClick={rollD20}
        disabled={!selectedCharacterId}>
        Roll D20
      </button>
      {selectedCharacter && (
        <span className="text-center bg-gray-300 w-auto p-3 flex-1 rounded">
          {selectedCharacter.name} rolled a {selectedCharacter.initiativeRoll}
        </span>
      )}
    </div>
  );
};

export default InitiativeRoller;
