import { useEffect, useRef, useState } from "react";

import { apiClient } from "@/api/httpClient";
import HomeFilterBar from "./homeFilterBar";
import HomeList from "./homeList";

export default function TrendingList() {
  const listRef = useRef<any>(null);

  const [listData, setListData] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("day");

  const tabData = [
    { name: "오늘", type: "day" },
    { name: "이번 주", type: "week" },
  ];

  const onClickTab = (type: string) => {
    setCurrentTab(type);

    apiClient.get(`trending/all/${type}?language=ko`).then((res: any) => {
      const ranSort = res.data.results.sort(() => Math.random() - 0.5);

      setListData(ranSort);

      listRef.current.scrollLeft = 0;
    });
  };

  useEffect(() => {
    apiClient.get("trending/all/day?language=ko").then((res: any) => {
      const ranSort = res.data.results.sort(() => Math.random() - 0.5);

      setListData(ranSort);
    });
  }, []);

  return (
    <div className="content">
      <div className="titleBar">
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
