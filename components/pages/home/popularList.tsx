"use client";

import { useRef, useState } from "react";

import { popularListApi } from "@/api/httpClient";
import CategoryTab from "./categoryTab";
import HomeList from "./homeList";

import contentsStyles from "@styles/pages/home/contents.module.scss";

export default function PopularList({ list }: { list: ContentsDataType[] }) {
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

  return (
    <div className={contentsStyles.content}>
      <div className={contentsStyles.title_bar}>
        <h2>{`What's Popular`}</h2>
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
