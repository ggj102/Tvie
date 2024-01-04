import { getSession } from "@auth0/nextjs-auth0";
import { initFavoritesList } from "@/lib/api/authZero";
import { apiClient, genreApi } from "@/lib/api/httpClient";

import Contents from "../components/contents";

async function ServerSideProps() {
  const session = await getSession();
  const isSession = !!session;

  const tvContents = await apiClient.get("tv/popular?language=ko&page=1");
  const genreData = await genreApi("tv");

  const listData = await initFavoritesList(tvContents.data.results);

  const total_Pages = tvContents.data.total_pages;

  return { isSession, listData, genreData, total_Pages };
}

export default async function TVPage() {
  const { isSession, listData, genreData, total_Pages } =
    await ServerSideProps();

  return (
    <Contents
      contentType="tv"
      isSession={isSession}
      list={listData}
      genreData={genreData}
      total_Pages={total_Pages}
    />
  );
}
