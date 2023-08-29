import { useState, useContext } from "react";
import MapURLContext from "../contexts/MapURLContext";

const MapForm = (): JSX.Element => {
  const { mapUrl, setMapUrl } = useContext(MapURLContext);
  const [formData, setFormData] = useState<{ url: string }>({ url: mapUrl });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMapUrl(formData.url);
    localStorage.setItem("mapUrl", formData.url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full"
        type="text"
        name="url"
        value={formData.url}
        onChange={handleChange}
        placeholder="Map Image URL"
      />
      <button className="w-full" type="submit">
        Update Map
      </button>
    </form>
  );
};

export default MapForm;
