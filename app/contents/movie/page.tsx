import { getSession } from "@auth0/nextjs-auth0";
import { initFavoritesList } from "@/api/authZero";
import { apiClient, genreApi } from "@/api/httpClient";

import Contents from "../components/contents";

async function ServerSideProps() {
  const session = await getSession();
  const isSession = !!session;

  const movieContents = await apiClient.get("movie/popular?language=ko&page=1");
  const genreData = await genreApi("movie");

  const listData = await initFavoritesList(movieContents.data.results);

  const total_Pages = movieContents.data.total_pages;

  return { isSession, listData, genreData, total_Pages };
}

export default async function MoviePage() {
  const { isSession, listData, genreData, total_Pages } =
    await ServerSideProps();

  return (
    <Contents
      contentType="movie"
      isSession={isSession}
      list={listData}
      genreData={genreData}
      total_Pages={total_Pages}
    />
  );
}
