"use client";

import useTrendingList from "./useTrendingList";

import HomeTitleBar from "../homeTitleBar";
import HomeList from "../homeList";

import homeStyles from "@styles/pages/home/home.module.scss";

export default function TrendingList({ data }: { data: any }) {
  const { listData, listRef, tabData, currentTab, onClickTab } =
    useTrendingList(data.trendingData);

  return (
    <div className={homeStyles.list_container}>
      <HomeTitleBar
        title="트렌딩"
        tabData={tabData}
        currentTab={currentTab}
        onClick={onClickTab}
      />
      <HomeList
        isSession={data.isSession}
        listData={listData}
        listRef={listRef}
      />
    </div>
  );
}
