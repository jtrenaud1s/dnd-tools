/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import CharacterContext from "../contexts/CharacterContext";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";
import MapURLContext from "../contexts/MapURLContext";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const CharacterForm = () => {
  const { characters, addCharacter, editCharacter, removeCharacter } =
    useContext(CharacterContext);

  const { selectedCharacterId, setSelectedCharacterId } = useContext(
    SelectedCharacterContext
  );
  const { mapCenter } = useContext(MapURLContext);

  const selectedCharacter =
    characters.find((char) => char.id === selectedCharacterId) || {};

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    type: "Friendly",
    initiativeModifier: 0,
    initiativeRoll: 0,
    imageUrl: "",
    position: { lat: mapCenter[0], lng: mapCenter[1] },
  });

  useEffect(() => {
    if (selectedCharacterId) {
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
        position: { lat: mapCenter[0], lng: mapCenter[1] },
      });
    }
  }, [selectedCharacterId]);

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };

  const handleInitiativeModifierChange = (e) => {
    const value = parseFloat(e.target.value);
    setFormData({
      ...formData,
      initiativeModifier: isNaN(value) ? 0 : value,
    });
  };

  const handleImageUrlChange = (e) => {
    setFormData({
      ...formData,
      imageUrl: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCharacterId) {
      editCharacter(formData);
    } else {
      console.log(mapCenter);
      addCharacter(formData);
    }
    setSelectedCharacterId(null); // Deselect the character after submitting
  };

  const handleDelete = () => {
    removeCharacter(selectedCharacterId);
    setSelectedCharacterId(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={formData.type}
          onChange={handleTypeChange}>
          <option>Friendly</option>
          <option>Enemy</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="initiativeModifier">
        <Form.Label>Initiative Modifier</Form.Label>
        <Form.Control
          type="number"
          name="initiativeModifier"
          value={formData.initiativeModifier}
          onChange={handleInitiativeModifierChange}
        />
      </Form.Group>
      <Form.Group controlId="imageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleImageUrlChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {selectedCharacterId ? "Edit" : "Add"} Character
      </Button>
      {selectedCharacterId && (
        <Button
          variant="danger"
          onClick={handleDelete}
          style={{ marginLeft: "10px" }}>
          Delete Character
        </Button>
      )}
    </Form>
  );
};

export default CharacterForm;
