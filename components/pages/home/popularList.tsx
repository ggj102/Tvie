import { useEffect, useRef, useState } from "react";

import { popularListApi } from "@/api/httpClient";
import HomeFilterBar from "./categoryTab";
import HomeList from "./homeList";

import contentsStyles from "@styles/pages/home/contents.module.scss";

export default function PopularList({ list }: { list: ContentsDataType[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  const [listData, setListData] = useState<ContentsDataType[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("stream");

  const tabData = [
    { name: "스트리밍", type: "stream" },
    { name: "TV", type: "tv" },
    { name: "대여", type: "rent" },
    { name: "극장", type: "theater" },
  ];

  const dataRandomSort = (data: ContentsDataType[]) => {
    return data.sort(() => Math.random() - 0.5);
  };

  const onClickTab = (type: string) => {
    setCurrentTab(type);

    popularListApi(type).then((res) => {
      let sortData = [];

      if (res.length > 1) {
        const [movieStream, tvStream] = res;
        const movieData = movieStream.data.results;
        const tvData = tvStream.data.results;
        const concat = movieData.concat(tvData);
        sortData = dataRandomSort(concat);
      } else sortData = dataRandomSort(res[0].data.results);

      setListData(sortData);

      if (listRef.current) listRef.current.scrollLeft = 0;
    });
  };

  useEffect(() => {
    if (list) {
      const data = dataRandomSort(list);

      setListData(data);
    }
  }, []);

  return (
    <div className={contentsStyles.content}>
      <div className={contentsStyles.title_bar}>
        <h2>{`What's Popular`}</h2>
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
