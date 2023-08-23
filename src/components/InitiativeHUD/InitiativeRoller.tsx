import { useContext, useEffect, useState } from "react";
import CharacterContext, { Character } from "../../contexts/CharacterContext";
import SelectedCharacterContext from "../../contexts/SelectedCharacterContext";

const InitiativeRoller = (): JSX.Element => {
  const { selectedCharacterId } = useContext(SelectedCharacterContext);
  const { characters, setCharacters } = useContext(CharacterContext);
  const [showResult, setShowResult] = useState(true);

  const rollD20 = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const updatedCharacters = characters.map((char: Character) => {
      if (char.id === selectedCharacterId) {
        return { ...char, initiativeRoll: roll };
      }
      return char;
    });
    setCharacters(updatedCharacters);
    setShowResult(true);
  };

  const selectedCharacter = characters.find(
    (char: Character) => char.id === selectedCharacterId
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showResult) {
      timeoutId = setTimeout(() => {
        setShowResult(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [showResult]);

  return (
    <div className="flex justify-center flex-col items-center">
      <button
        className="self-center px-4 py-1 mb-4"
        onClick={rollD20}
        disabled={!selectedCharacterId}>
        Roll D20
      </button>
      {showResult && selectedCharacter && (
        <div className="w-16 relative text-center bg-gray-300 p-3 flex-1 rounded transition-all duration-500 ease-in-out">
          <div className="text-2xl">{selectedCharacter.initiativeRoll}</div>
          <span className="text-sm absolute bottom-0 right-1">
            +{selectedCharacter.initiativeModifier}
          </span>
        </div>
      )}
    </div>
  );
};

export default InitiativeRoller;
