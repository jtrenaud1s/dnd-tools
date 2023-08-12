import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import MapURLContext from "../contexts/MapURLContext";

const MapForm = () => {
  const {mapUrl, setMapUrl} = useContext(MapURLContext);
  const [formData, setFormData] = useState({ url: mapUrl });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMapUrl(formData.url);
    localStorage.setItem("mapUrl", formData.url);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="mapUrl">
        <Form.Label>Map Image URL</Form.Label>
        <Form.Control
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Enter map image URL"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Map
      </Button>
    </Form>
  );
};

export default MapForm;
