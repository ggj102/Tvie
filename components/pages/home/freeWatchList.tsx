import { useEffect, useRef, useState } from "react";

import { apiClient } from "@/api/httpClient";
import HomeFilterBar from "./categoryTab";
import HomeList from "./homeList";
import { ContentDataType } from "@/components/pages/contents/contents";

import contentsStyles from "@styles/pages/home/contents.module.scss";

export default function FreeWatchList({ list }: any) {
  const listRef = useRef<HTMLUListElement>(null);
  const commonQuery =
    "language=ko&watch_region=KR&sort_by=popularity.desc&with_watch_monetization_types=free|ads&with_genres=&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&with_runtime.gte=0&with_runtime.lte=400&page=1";
  const movieQuery = `discover/movie?include_adult=false&include_video=false&${commonQuery}`;
  const tvQuery = `discover/tv?include_adult=false&include_null_first_air_dates=false&${commonQuery}`;

  const [listData, setListData] = useState<ContentDataType[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("movie");

  const tabData = [
    { name: "영화", type: "movie" },
    { name: "TV", type: "tv" },
  ];

  const onClickTab = (type: string) => {
    setCurrentTab(type);
    const query = type === "movie" ? movieQuery : tvQuery;

    apiClient.get(query).then((res) => {
      const ranSort = res.data.results.sort(() => Math.random() - 0.5);

      setListData(ranSort);

      if (listRef.current) {
        listRef.current.scrollLeft = 0;
      }
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
        <h2>Free To Watch</h2>
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
