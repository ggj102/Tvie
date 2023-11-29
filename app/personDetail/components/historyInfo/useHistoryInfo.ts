import { useEffect, useRef, useState } from "react";

export default function useHistoryInfo() {
  const textRef = useRef<any>(null);

  const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
  const [isOpenBtn, setIsOpenBtn] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(222);

  const onClickTextOpen = () => {
    const height = isOpenHistory ? 222 : textRef.current.offsetHeight;
    setMaxHeight(height);
    setIsOpenHistory(!isOpenHistory);
  };

  useEffect(() => {
    if (textRef) {
      if (textRef.current.offsetHeight > 222) setIsOpenBtn(true);
    }
  }, [textRef]);

  return { maxHeight, textRef, isOpenBtn, isOpenHistory, onClickTextOpen };
}
