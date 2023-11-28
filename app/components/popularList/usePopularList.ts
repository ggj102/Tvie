"use client";

import { useRef, useState } from "react";
import { popularListApi } from "@/api/httpClient";

export default function usePopularList(list: ContentsDataType[]) {
  const listRef = useRef<HTMLUListElement>(null);

  const [listData, setListData] = useState<ContentsDataType[]>(list);
  const [currentTab, setCurrentTab] = useState<string>("stream");

  const tabData = [
    { name: "스트리밍", type: "stream" },
    { name: "TV", type: "tv" },
    { name: "대여", type: "rent" },
    { name: "극장", type: "theater" },
  ];

  const onClickTab = (type: string) => {
    setCurrentTab(type);

    popularListApi(type).then((res) => {
      setListData(res);

      if (listRef.current) listRef.current.scrollLeft = 0;
    });
  };

  return {
    listRef,
    listData,
    currentTab,
    tabData,
    onClickTab,
  };
}
