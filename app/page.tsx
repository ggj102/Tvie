import { homeApi } from "@/api/httpClient";

import SearchBar from "../components/pages/home/searchBar";
import TrendingList from "../components/pages/home/trendingList";
import FreeWatchList from "../components/pages/home/freeWatchList";
import PopularList from "../components/pages/home/popularList";

import homeStyles from "@styles/pages/home/home.module.scss";

async function ServerSideProps() {
  const homeData = await homeApi();

  return homeData;
}

export default async function Home() {
  const homeData = await ServerSideProps();
  const { trendingData, popularData, freeWatchData } = homeData;

  return (
    <div className={homeStyles.home}>
      <SearchBar />
      <TrendingList list={trendingData} />
      <PopularList list={popularData} />
      <FreeWatchList list={freeWatchData} />
    </div>
  );
}
