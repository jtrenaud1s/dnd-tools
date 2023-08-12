import { useEffect, useState } from "react";
import board from "../assets/board.jpeg";

const useImageLoader = (screenWidth) => {
  const [imageDimensions, setImageDimensions] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = board;
    img.onload = function () {
      const renderedHeight = (screenWidth / this.width) * this.height;
      setImageDimensions({ width: screenWidth, height: renderedHeight });
    };
  }, [screenWidth]);

  return imageDimensions;
};

export default useImageLoader;
