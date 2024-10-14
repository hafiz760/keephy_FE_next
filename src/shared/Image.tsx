import Image from "next/image";
import React, { useState } from "react";

interface ImageDisplayProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  image?: boolean;
  height?: number;
  width?: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = (props) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {imageError ? (
        <Image
          src={
            props.image
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSZpPDnjQBynSxEHYXo-orWYtvNybtifvhMUdsVjEhuOFpkDYPshISj_TpITVzJullxW4&usqp=CAU"
              : ""
          }
          alt="Placeholder"
          className={props.className || ""}
          style={props.style || {}}
          height={props.height}
          width={props.width}
        />
      ) : (
        <img
          src={props.src || ""}
          alt={props.alt || "Image"}
          className={props.className || ""}
          style={props.style || {}}
          onError={handleImageError}
          height={props.height}
          width={props.width}
        />
      )}
    </>
  );
};

export default ImageDisplay;
