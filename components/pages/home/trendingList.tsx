"use client";

import { useRef, useState } from "react";

import { apiClient } from "@/api/httpClient";
import CategoryTab from "./categoryTab";
import HomeList from "./homeList";

import contentsStyles from "@styles/pages/home/contents.module.scss";
import { dataRandomSort } from "@/utils/dataRandomSort";

export default function TrendingList({ list }: { list: ContentsDataType[] }) {
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

  return (
    <div className={contentsStyles.content}>
      <div className={contentsStyles.title_bar}>
        <h2>트렌딩</h2>
        <CategoryTab
          tabData={tabData}
          currentTab={currentTab}
          onClick={onClickTab}
        />
      </div>
      <HomeList listData={listData} listRef={listRef} />
    </div>
  );
}
