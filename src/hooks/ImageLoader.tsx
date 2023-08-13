import { useEffect, useState } from "react";
import board from "../assets/board.jpeg";

export interface ImageDimensions {
  width: number;
  height: number;
}

export const useImageLoader = (screenWidth: number): ImageDimensions | null => {
  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = board;
    img.onload = function () {
      const renderedHeight = (screenWidth / img.width) * img.height;
      setImageDimensions({ width: screenWidth, height: renderedHeight });
    };
  }, [screenWidth]);

  return imageDimensions;
};
