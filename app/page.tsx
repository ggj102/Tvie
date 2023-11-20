"use client";
import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "./context";
import { mainApi } from "@/api/httpClient";

import ContentLayout from "@/components/contentLayout";
import SearchBar from "./index/searchBar";
import TrendingList from "./index/trendingList";
import FreeWatchList from "./index/freeWatchList";
import PopularList from "./index/popularList";

import { IndexWrapper } from "@/styles/pages/index/indexWrapper";

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
      <ContentLayout>
        <IndexWrapper>
          <SearchBar />
          <TrendingList list={listData[0]} />
          <PopularList list={listData[1]} />
          <FreeWatchList list={listData[2]} />
        </IndexWrapper>
      </ContentLayout>
    )
  );
}
