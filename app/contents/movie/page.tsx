import { apiClient, genreApi } from "@/api/httpClient";
import Contents from "@/components/pages/contents";

async function ServerSideProps() {
  const movieContents = await apiClient.get("movie/popular?language=ko&page=1");
  const genreData = await genreApi("movie");

  const listData = movieContents.data.results;
  const total_Pages = movieContents.data.total_pages;

  return { listData, genreData, total_Pages };
}

export default async function MoviePage() {
  const { listData, genreData, total_Pages } = await ServerSideProps();

  return (
    <Contents
      contentType="movie"
      list={listData}
      genreData={genreData}
      total_Pages={total_Pages}
    />
  );
}
