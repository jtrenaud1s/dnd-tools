import { useEffect, useContext } from "react";
import MapBoundsContext from "../contexts/MapBoundsContext.jsx";

const useSetBounds = (imageDimensions) => {
  const { setBounds } = useContext(MapBoundsContext);

  useEffect(() => {
    if (imageDimensions) {
      setBounds([
        [0, 0],
        [imageDimensions.height, imageDimensions.width],
      ]);
    }
  }, [imageDimensions]);
};

export default useSetBounds;
