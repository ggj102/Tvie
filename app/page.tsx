"use client";
import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "./context";
import { mainApi } from "@/api/httpClient";

import SearchBar from "../components/pages/home/searchBar";
import TrendingList from "../components/pages/home/trendingList";
import FreeWatchList from "../components/pages/home/freeWatchList";
import PopularList from "../components/pages/home/popularList";

import homeStyles from "@styles/pages/home/home.module.scss";

export default function Home() {
  const { isLoading, setIsLoading } = useContext(GlobalContext);

  const [trendingData, setTrendingData] = useState<ContentsDataType[]>([]);
  const [popularData, setPopularData] = useState<ContentsDataType[]>([]);
  const [freeWatchData, setFreeWatchData] = useState<ContentsDataType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    mainApi().then((res) => {
      const movieData = res[1].data.results;
      const tvData = res[2].data.results;
      const popularConcat = movieData.concat(tvData);

      setTrendingData(res[0].data.results);
      setPopularData(popularConcat);
      setFreeWatchData(res[2].data.results);

      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <div className={homeStyles.home}>
        <SearchBar />
        <TrendingList list={trendingData} />
        <PopularList list={popularData} />
        <FreeWatchList list={freeWatchData} />
      </div>
    )
  );
}
