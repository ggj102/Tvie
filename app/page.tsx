"use client";

import ContentLayout from "@/components/contentLayout";
import SearchBar from "./index/searchBar";
import TrendingList from "./index/trendingList";
import FreeWatchList from "./index/freeWatchList";
import PopularList from "./index/popularList";

import { IndexWrapper } from "@/styles/pages/index/indexWrapper";

export default function Home() {
  return (
    <ContentLayout>
      <IndexWrapper>
        <SearchBar />
        <TrendingList />
        <PopularList />
        <FreeWatchList />
      </IndexWrapper>
    </ContentLayout>
  );
}
