/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import CharacterContext from "../contexts/CharacterContext";
import SelectedCharacterContext from "../contexts/SelectedCharacterContext";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const CharacterForm = () => {
  const [characters, setCharacters] = useContext(CharacterContext);
  const [selectedCharacterId, setSelectedCharacterId] = useContext(
    SelectedCharacterContext
  );

  const selectedCharacter =
    characters.find((char) => char.id === selectedCharacterId) || {};

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    type: "Friendly",
    initiativeModifier: 0,
    imageUrl: "",
    position: { lat: 50, lng: 50 },
  });

  useEffect(() => {
    if (selectedCharacterId) {
      setFormData({
        ...selectedCharacter,
        position: selectedCharacter.position || { lat: 50, lng: 50 },
      });
    } else {
      setFormData({
        id: uuidv4(),
        name: "",
        type: "Friendly",
        initiativeModifier: 0,
        imageUrl: "",
        position: { lat: 50, lng: 50 },
      });
    }
  }, [selectedCharacterId]);

  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };
  const editCharacter = (updatedCharacter) => {
    // Find the index of the character to be updated
    const charIndex = characters.findIndex(
      (char) => char.id === updatedCharacter.id
    );

    // Create a new array with the updated character
    const newCharacters = [...characters];
    newCharacters[charIndex] = updatedCharacter;

    // Update the characters state
    setCharacters(newCharacters);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCharacterId) {
      editCharacter(formData);
    } else {
      addCharacter(formData);
    }
    setSelectedCharacterId(null); // Deselect the character after submitting
  };

  const handleDelete = () => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((char) => char.id !== selectedCharacterId)
    );
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
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={formData.type}
          onChange={handleChange}>
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
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="imageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
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
