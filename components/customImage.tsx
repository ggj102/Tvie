"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import customImage from "@styles/common/customImage.module.scss";

export default function CustomImage({
  className,
  type,
  src,
}: {
  className?: string;
  type: string;
  src: string;
}) {
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>(src);

  const onLoadImage = () => {
    setIsLoad(false);
  };

  const onErrorImagePath = () => {
    const noneImg =
      type === "content"
        ? "/images/noneContentImg.svg"
        : "/images/nonePersonImg.svg";

    setImagePath(noneImg);
    setIsError(true);
  };

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImagePath(src);
  }, [src]);

  return (
    <div
      className={`${customImage.custom_image} ${
        isError ? customImage.none_image : ""
      } ${className ? className : ""}`}
    >
      <div
        className={
          isLoad ? customImage.loading_image : customImage.display_none
        }
      >
        <div>
          <Image src="/images/loadingText.png" fill alt="loadingText" />
        </div>
      </div>
      <Image
        ref={imageRef}
        onLoad={onLoadImage}
        onError={onErrorImagePath}
        src={imagePath}
        fill
        sizes="1x"
        alt="contentImg"
      />
    </div>
  );
}
