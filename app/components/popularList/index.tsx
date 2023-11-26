"use client";

import usePopularList from "./usePopularList";

import HomeTitleBar from "../homeTitleBar";
import HomeList from "../homeList";

import homeStyles from "@styles/pages/home/home.module.scss";

export default function PopularList({ list }: { list: ContentsDataType[] }) {
  const { listData, listRef, tabData, currentTab, onClickTab } =
    usePopularList(list);

  return (
    <div className={homeStyles.list_container}>
      <HomeTitleBar
        title={`What's Popular`}
        tabData={tabData}
        currentTab={currentTab}
        onClick={onClickTab}
      />
      <HomeList listData={listData} listRef={listRef} />
    </div>
  );
}
