"use client";

import { apiClient } from "@/api/httpClient";
import { dataRandomSort } from "@/utils/dataRandomSort";
import { useRef, useState } from "react";

export default function useTrendingList(list: ContentsDataType[]) {
  const listRef = useRef<HTMLUListElement>(null);
  const [listData, setListData] = useState<ContentsDataType[]>(list);
  const [currentTab, setCurrentTab] = useState<string>("day");

  const tabData = [
    { name: "오늘", type: "day" },
    { name: "이번 주", type: "week" },
  ];

  const onClickTab = (type: string) => {
    setCurrentTab(type);

    apiClient.get(`trending/all/${type}?language=ko`).then((res) => {
      const ranSort = dataRandomSort([res]);

      setListData(ranSort);

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
