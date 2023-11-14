import { useEffect, useRef, useState } from "react";

import { apiClient } from "@/api/httpClient";
import HomeFilterBar from "./homeFilterBar";
import HomeList from "./homeList";

export default function FreeWatchList() {
  const listRef = useRef<any>(null);
  const commonQuery =
    "language=ko&watch_region=KR&sort_by=popularity.desc&with_watch_monetization_types=free|ads&with_genres=&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&with_runtime.gte=0&with_runtime.lte=400&page=1";
  const movieQuery = `discover/movie?include_adult=false&include_video=false&${commonQuery}`;
  const tvQuery = `discover/tv?include_adult=false&include_null_first_air_dates=false&${commonQuery}`;

  const [listData, setListData] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("movie");

  const tabData = [
    { name: "영화", type: "movie" },
    { name: "TV", type: "tv" },
  ];

  const onClickTab = (type: string) => {
    setCurrentTab(type);
    const query = type === "movie" ? movieQuery : tvQuery;

    apiClient.get(query).then((res: any) => {
      const ranSort = res.data.results.sort(() => Math.random() - 0.5);

      setListData(ranSort);

      listRef.current.scrollLeft = 0;
    });
  };

  useEffect(() => {
    apiClient(movieQuery).then((res) => {
      const ranSort = res.data.results.sort(() => Math.random() - 0.5);

      setListData(ranSort);
    });
  }, []);

  return (
    <div className="content">
      <div className="titleBar">
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
