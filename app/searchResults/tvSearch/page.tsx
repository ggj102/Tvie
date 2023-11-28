import { apiClient } from "@/api/httpClient";
import SearchResultsList from "../components/searchResultsList";

async function ServerSideProps(searchParams: any) {
  const { search } = searchParams;
  const query = `query=${search}&include_adult=false&language=ko&page=`;

  const searchTV = await apiClient.get(`search/tv?${query}1`);
  const list = searchTV.data.results;
  const totalPages = searchTV.data.total_pages;

  return { list, totalPages };
}

export default async function TVSearchPage({ searchParams }: any) {
  const { list, totalPages } = await ServerSideProps(searchParams);

  return <SearchResultsList type="tv" list={list} totalPages={totalPages} />;
}
