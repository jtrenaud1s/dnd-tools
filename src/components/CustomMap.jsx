/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import DraggableMarker from "./DraggableMarker";
import { useImageLoader } from "../hooks/ImageLoader";
import { Spinner } from "react-bootstrap";
import useMapInitialization from "../hooks/useMapInitialization";
import useSetBounds from "../hooks/useSetBounds";
import MapURLContext from "../contexts/MapURLContext";
import MapBoundsContext from "../contexts/MapBoundsContext";
import InitiativeHUD from "./InitiativeHUD";

const CustomMap = () => {
  const { mapUrl, setMapCenter, mapCenter } = useContext(MapURLContext);
  const { bounds } = useContext(MapBoundsContext);
  const imageDimensions = useImageLoader(window.innerWidth);
  const mapRef = useRef(null);

  const characters = useMapInitialization(mapRef, mapUrl);
  useSetBounds(imageDimensions);

  useEffect(() => {
    if (!imageDimensions || !bounds) return;
    setMapCenter([imageDimensions.height / 2, imageDimensions.width / 2]);
  }, [mapUrl, imageDimensions, bounds, setMapCenter]);

  if (!imageDimensions || !bounds) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="map-container">
      <InitiativeHUD />
      <MapContainer
        ref={mapRef}
        center={mapCenter}
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
    </div>
  );
};

export default CustomMap;
