import { useRef, useState } from "react";
import Image from "next/image";

import { CustomImageWrapper } from "@/styles/components/customImageWrapper";

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

  const imageRef = useRef<any>(null);

  return (
    <CustomImageWrapper>
      <div
        className={`${isError ? "noneImg" : ""} ${className ? className : ""}`}
      >
        <div className={isLoad ? "imgLoading" : "displayNone"}>
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
    </CustomImageWrapper>
  );
}
