import { apiClient } from "@/api/httpClient";
import SearchResultsList from "@/app/searchResults/components/searchResultsList";

async function ServerSideProps(searchParams: any) {
  const { search } = searchParams;
  const query = `query=${search}&include_adult=false&language=ko&page=`;

  const searchMovie = await apiClient.get(`search/movie?${query}1`);
  const list = searchMovie.data.results;
  const totalPages = searchMovie.data.total_pages;

  return { list, totalPages };
}

export default async function MovieSearchPage({ searchParams }: any) {
  const { list, totalPages } = await ServerSideProps(searchParams);

  return <SearchResultsList type="movie" list={list} totalPages={totalPages} />;
}
