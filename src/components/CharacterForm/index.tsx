import { useContext, useState, useEffect } from "react";
import CharacterContext, {
  Character,
  Position,
} from "../../contexts/CharacterContext";
import SelectedCharacterContext from "../../contexts/SelectedCharacterContext";
import MapURLContext from "../../contexts/MapURLContext";

interface FormData {
  id: string;
  name: string;
  type: string;
  initiativeModifier: number;
  initiativeRoll: number;
  imageUrl: string;
  position: Position;
}

type CharacterSelection = Character | undefined;

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const CharacterForm = (): JSX.Element => {
  const { characters, addCharacter, editCharacter, removeCharacter } =
    useContext(CharacterContext);

  const { selectedCharacterId, setSelectedCharacterId } = useContext(
    SelectedCharacterContext
  );
  const { mapCenter } = useContext(MapURLContext);

  const selectedCharacter: CharacterSelection = characters.find(
    (char) => char.id === selectedCharacterId
  );

  const [formData, setFormData] = useState<FormData>({
    id: uuidv4(),
    name: "",
    type: "Friendly",
    initiativeModifier: 0,
    initiativeRoll: 0,
    imageUrl: "",
    position: mapCenter,
  });

  useEffect(() => {
    if (selectedCharacter) {
      setFormData({
        ...selectedCharacter,
        position: selectedCharacter.position,
      });
    } else {
      setFormData({
        id: uuidv4(),
        name: "",
        type: "Friendly",
        initiativeModifier: 0,
        initiativeRoll: 0,
        imageUrl: "",
        position: mapCenter,
      });
    }
  }, [selectedCharacterId]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === "number"
          ? parseInt(event.target.value)
          : event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (selectedCharacterId) {
      editCharacter(formData);
    } else {
      addCharacter(formData);
    }
    setFormData({
      id: uuidv4(),
      name: "",
      type: "Friendly",
      initiativeModifier: 0,
      initiativeRoll: 0,
      imageUrl: "",
      position: mapCenter,
    });
  };

  const handleDelete = (): void => {
    if (selectedCharacterId) {
      removeCharacter(selectedCharacterId);
      setSelectedCharacterId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Character Name"
        required
      />
      <select
        className="w-full"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Team">
        <option value="Friendly">Friendly</option>
        <option value="Enemy">Enemy</option>
      </select>
      <input
        className="w-full"
        type="number"
        name="initiativeModifier"
        value={formData.initiativeModifier}
        onChange={handleChange}
        placeholder="Initiative Modifier"
      />
      <input
        className="w-full"
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <div className="flex flex-row align-start justify-between w-full">
        <button type="submit">{selectedCharacterId ? "Save" : "Add"}</button>
        {selectedCharacterId && <button onClick={handleDelete}>Delete</button>}
      </div>
    </form>
  );
};

export default CharacterForm;
