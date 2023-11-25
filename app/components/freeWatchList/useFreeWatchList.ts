"use client";

import { useRef, useState } from "react";
import { apiClient } from "@/api/httpClient";
import { dataRandomSort } from "@/utils/dataRandomSort";

export default function useFreeWatchList(list: ContentsDataType[]) {
  const listRef = useRef<HTMLUListElement>(null);
  const commonQuery =
    "language=ko&watch_region=KR&sort_by=popularity.desc&with_watch_monetization_types=free|ads&with_genres=&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&with_runtime.gte=0&with_runtime.lte=400&page=1";
  const movieQuery = `discover/movie?include_adult=false&include_video=false&${commonQuery}`;
  const tvQuery = `discover/tv?include_adult=false&include_null_first_air_dates=false&${commonQuery}`;

  const [listData, setListData] = useState<ContentsDataType[]>(list);
  const [currentTab, setCurrentTab] = useState<string>("movie");

  const tabData = [
    { name: "영화", type: "movie" },
    { name: "TV", type: "tv" },
  ];

  const onClickTab = (type: string) => {
    setCurrentTab(type);
    const query = type === "movie" ? movieQuery : tvQuery;

    apiClient.get(query).then((res) => {
      const ranSort = dataRandomSort([res]);

      setListData(ranSort);

      if (listRef.current) listRef.current.scrollLeft = 0;
    });
  };

  return {
    listRef,
    listData,
    currentTab,
    tabData,
    onClickTab,
  };
}
