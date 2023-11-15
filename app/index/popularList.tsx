import { useEffect, useRef, useState } from "react";

import { popularListApi } from "@/api/httpClient";
import HomeFilterBar from "./homeFilterBar";
import HomeList from "./homeList";
import { ContentDataType } from "@/components/contentList";

export default function PopularList() {
  const listRef = useRef<HTMLUListElement>(null);

  const [listData, setListData] = useState<ContentDataType[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("stream");

  const tabData = [
    { name: "스트리밍", type: "stream" },
    { name: "TV", type: "tv" },
    { name: "대여", type: "rent" },
    { name: "극장", type: "theater" },
  ];

  const dataRandomSort = (response: any) => {
    if (response.length > 1) {
      const [movieStream, tvStream] = response;
      const movieData = movieStream.data.results;
      const tvData = tvStream.data.results;
      const concat = movieData.concat(tvData);

      return concat.sort(() => Math.random() - 0.5);
    } else return response[0].data.results.sort(() => Math.random() - 0.5);
  };

  const onClickTab = (type: string) => {
    setCurrentTab(type);

    popularListApi(type).then((res) => {
      const data = dataRandomSort(res);

      setListData(data);

      if (listRef.current) listRef.current.scrollLeft = 0;
    });
  };

  useEffect(() => {
    popularListApi("stream").then((res) => {
      const data = dataRandomSort(res);

      setListData(data);
    });
  }, []);

  return (
    <div className="content">
      <div className="titleBar">
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
