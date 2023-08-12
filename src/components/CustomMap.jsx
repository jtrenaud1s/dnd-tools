/* eslint-disable react/prop-types */
import { useContext, useState, useEffect, useRef } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapContext from "../contexts/MapContext";
import CharacterContext from "../contexts/CharacterContext";
import DraggableMarker from "./DraggableMarker";

const CustomMap = () => {
  // eslint-disable-next-line no-unused-vars
  const [mapUrl, setMapUrl, bounds, setBounds] = useContext(MapContext);
  const [characters, setCharacters] = useContext(CharacterContext);
  const [imageDimensions, setImageDimensions] = useState(null);
  const screenWidth = window.innerWidth;
  const mapRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = mapUrl;
    img.onload = function () {
      const renderedHeight = (screenWidth / this.width) * this.height;
      setImageDimensions({ width: screenWidth, height: renderedHeight });
    };
  }, [mapUrl, screenWidth]);

  useEffect(() => {
    if (!mapRef.current) return;
    const center = mapRef.current.getCenter();
    const updatedCharacters = characters.map((character) => ({
      ...character,
      position: center,
    }));
    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  }, [mapUrl]);

  useEffect(() => {
    if (imageDimensions) {
      setBounds([
        [0, 0],
        [imageDimensions.height, imageDimensions.width],
      ]);
    }
  }, [imageDimensions, setBounds]);

  if (!imageDimensions) return null;
  if (!bounds) return null;
  const center = [imageDimensions.height / 2, imageDimensions.width / 2];

  console.log(bounds);

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={0}
      zoomSnap={0.1}
      maxZoom={10}
      minZoom={0.1}
      style={{ height: "100vh", width: "100vw" }}
      crs={L.CRS.Simple}
      maxBounds={bounds}
      maxBoundsViscosity={1}
      attributionControl={false}>
      <ImageOverlay url={mapUrl} bounds={bounds} zIndex={1} />
      {characters.map((character) => (
        <DraggableMarker
          key={character.id}
          image={character.imageUrl}
          character={character}
        />
      ))}
    </MapContainer>
  );
};

export default CustomMap;
