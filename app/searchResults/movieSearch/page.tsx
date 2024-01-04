import { initFavoritesList } from "@/lib/api/authZero";
import { apiClient } from "@/lib/api/httpClient";
import SearchResultsList from "@/app/searchResults/components/searchResultsList";
import { getSession } from "@auth0/nextjs-auth0";

async function ServerSideProps(searchParams: any) {
  const { search } = searchParams;
  const session = await getSession();
  const isSession = !!session;

  const query = `query=${search}&include_adult=false&language=ko&page=`;

  const searchMovie = await apiClient.get(`search/movie?${query}1`);
  const list = await initFavoritesList(searchMovie.data.results);
  const totalPages = searchMovie.data.total_pages;

  return { isSession, list, totalPages };
}

export default async function MovieSearchPage({ searchParams }: any) {
  const { isSession, list, totalPages } = await ServerSideProps(searchParams);

  return (
    <SearchResultsList
      type="movie"
      isSession={isSession}
      list={list}
      totalPages={totalPages}
    />
  );
}
