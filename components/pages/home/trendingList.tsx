import { useEffect, useRef, useState } from "react";

import { apiClient } from "@/api/httpClient";
import HomeFilterBar from "./categoryTab";
import HomeList from "./homeList";
import { ContentDataType } from "@/components/pages/contents/contents";

import contentsStyles from "@styles/pages/home/contents.module.scss";

export default function TrendingList({ list }: any) {
  const listRef = useRef<HTMLUListElement>(null);

  const [listData, setListData] = useState<ContentDataType[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("day");

  const tabData = [
    { name: "오늘", type: "day" },
    { name: "이번 주", type: "week" },
  ];

  const onClickTab = (type: string) => {
    setCurrentTab(type);

    apiClient.get(`trending/all/${type}?language=ko`).then((res) => {
      const ranSort = res.data.results.sort(() => Math.random() - 0.5);

      setListData(ranSort);

      if (listRef.current) listRef.current.scrollLeft = 0;
    });
  };

  useEffect(() => {
    if (list) {
      const ranSort = list.sort(() => Math.random() - 0.5);

      setListData(ranSort);
    }
  }, []);

  return (
    <div className={contentsStyles.content}>
      <div className={contentsStyles.title_bar}>
        <h2>트렌딩</h2>
        <HomeFilterBar
          tabData={tabData}
          currentTab={currentTab}
          onClick={onClickTab}
        />
      </div>
      <HomeList listData={listData} listRef={listRef} />
    </div>
  );
}
