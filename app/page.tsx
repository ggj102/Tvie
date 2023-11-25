import { homeApi } from "@/api/httpClient";

import HomeSearchBar from "./components/homeSearchBar/homeSearchBar";
import TrendingList from "./components/trendingList/trendingList";
import PopularList from "./components/popularList/popularList";
import FreeWatchList from "./components/freeWatchList/freeWatchList";

import homeStyles from "@styles/pages/home/home.module.scss";

async function ServerSideProps() {
  const homeData = await homeApi();

  return homeData;
}

export default async function Home() {
  const homeData = await ServerSideProps();
  const { trendingData, popularData, freeWatchData } = homeData;

  return (
    <div className={homeStyles.home_container}>
      <HomeSearchBar />
      <TrendingList list={trendingData} />
      <PopularList list={popularData} />
      <FreeWatchList list={freeWatchData} />
    </div>
  );
}
