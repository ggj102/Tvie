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
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    mainApi().then((res: any) => {
      const resData = [res[0].data.results, res[1], res[2].data.results];

      setListData(resData);
      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <div className={homeStyles.home}>
        <SearchBar />
        <TrendingList list={listData[0]} />
        <PopularList list={listData[1]} />
        <FreeWatchList list={listData[2]} />
      </div>
    )
  );
}
