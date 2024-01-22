import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import addHistory from "@/utils/addHistory";

export default function useHistoryInfo() {
  const textRef = useRef<any>(null);
  const searchParams = useSearchParams();

  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
  const [isOpenBtn, setIsOpenBtn] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(222);

  const onClickTextOpen = () => {
    const height = isOpenHistory ? 222 : textRef.current.offsetHeight;
    setMaxHeight(height);
    setIsOpenHistory(!isOpenHistory);
  };

  useEffect(() => {
    const paramsId = searchParams.get("id");

    addHistory("person", paramsId);

    if (textRef) {
      if (textRef.current.offsetHeight > 222) setIsOpenBtn(true);
    }
  }, [textRef]);

  return { maxHeight, textRef, isOpenBtn, isOpenHistory, onClickTextOpen };
}
