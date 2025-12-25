"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageFallbackProps extends Omit<ImageProps, 'onError'> {
  fallback?: string;
}

const ImageFallback: React.FC<ImageFallbackProps> = ({
  fallback = "/images/placeholder.png",
  src,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
