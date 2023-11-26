import { apiClient, genreApi } from "@/api/httpClient";
import Contents from "@/components/pages/contents";

async function ServerSideProps() {
  const tvContents = await apiClient.get("tv/popular?language=ko&page=1");
  const genreData = await genreApi("tv");

  const listData = tvContents.data.results;
  const total_Pages = tvContents.data.total_pages;

  return { listData, genreData, total_Pages };
}

export default async function TVPage() {
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
