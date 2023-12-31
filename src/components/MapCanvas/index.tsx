import { useContext, useEffect, useRef } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useImageLoader } from "../../hooks/ImageLoader";
import useMapInitialization from "../../hooks/useMapInitialization";
import useSetBounds from "../../hooks/useSetBounds";
import MapURLContext, {
  MapURLContextValue,
} from "../../contexts/MapURLContext";
import MapBoundsContext, {
  MapBoundsContextValue,
} from "../../contexts/MapBoundsContext";
import DraggableMarker from "./DraggableMarker";
import InitiativeHUD from "../InitiativeHUD";
import "./mapCanvas.scss";
import Loadscreen from "../Loadscreen";

const MapCanvas = (): JSX.Element => {
  const { mapUrl, setMapCenter, mapCenter } =
    useContext<MapURLContextValue>(MapURLContext);
  const { bounds } = useContext<MapBoundsContextValue>(MapBoundsContext);
  const imageDimensions = useImageLoader(window.innerWidth);
  const mapRef = useRef<L.Map>(null);

  const characters = useMapInitialization({ mapRef, mapUrl });
  useSetBounds(imageDimensions);

  useEffect(() => {
    if (!imageDimensions || !bounds) return;
    setMapCenter({
      lat: imageDimensions.height / 2,
      lng: imageDimensions.width / 2,
    });
  }, [mapUrl, imageDimensions, bounds, setMapCenter]);

  if (!imageDimensions || !bounds) {
    return <Loadscreen />;
  }

  return (
    <>
      <InitiativeHUD />
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={0}
        zoomSnap={0.1}
        maxZoom={10}
        minZoom={0}
        crs={L.CRS.Simple}
        
        className="canvas"
        maxBounds={bounds}
        maxBoundsViscosity={1}
        attributionControl={false}>
        <ImageOverlay url={mapUrl} bounds={bounds} />
        {characters.map((character) => (
          <DraggableMarker key={character.id} character={character} />
        ))}
      </MapContainer>
    </>
  );
};

export default MapCanvas;
