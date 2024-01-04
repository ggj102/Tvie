"use client";

import useFreeWatchList from "./useFreeWatchList";

import HomeTitleBar from "../homeTitleBar";
import HomeList from "../homeList";

import homeStyles from "@styles/pages/home/home.module.scss";

export default function FreeWatchList({ data }: { data: any }) {
  const { listData, listRef, tabData, currentTab, onClickTab } =
    useFreeWatchList(data.freeWatchData);

  return (
    <div className={homeStyles.list_container}>
      <HomeTitleBar
        title="Free To Watch"
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
