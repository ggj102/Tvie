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
  const [isError, setIsError] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>(src);

  const onErrorImagePath = (e: any) => {
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
        <Image
          ref={imageRef}
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
