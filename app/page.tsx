import { homeApi } from "@/api/httpClient";

import HomeBanner from "./components/homeBanner";
import TrendingList from "./components/trendingList";
import PopularList from "./components/popularList";
import FreeWatchList from "./components/freeWatchList";

import homeStyles from "@styles/pages/home/home.module.scss";

async function ServerSideProps() {
  const homeData = await homeApi();

  return homeData;
}

export default async function Home() {
  const { bannerImg, trendingData, popularData, freeWatchData } =
    await ServerSideProps();

  return (
    <div className={homeStyles.home_container}>
      <HomeBanner imagePath={bannerImg} />
      <TrendingList list={trendingData} />
      <PopularList list={popularData} />
      <FreeWatchList list={freeWatchData} />
    </div>
  );
}
