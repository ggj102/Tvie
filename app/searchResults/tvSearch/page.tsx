import { apiClient } from "@/lib/api/httpClient";
import SearchResultsList from "../components/searchResultsList";
import { initFavoritesList } from "@/lib/api/authZero";
import { getSession } from "@auth0/nextjs-auth0";

async function ServerSideProps(searchParams: any) {
  const { search } = searchParams;
  const session = await getSession();
  const isSession = !!session;

  const query = `query=${search}&include_adult=false&language=ko&page=`;

  const searchTV = await apiClient.get(`search/tv?${query}1`);
  const list = await initFavoritesList(searchTV.data.results);
  const totalPages = searchTV.data.total_pages;

  return { isSession, list, totalPages };
}

export default async function TVSearchPage({ searchParams }: any) {
  const { isSession, list, totalPages } = await ServerSideProps(searchParams);

  return (
    <SearchResultsList
      type="tv"
      isSession={isSession}
      list={list}
      totalPages={totalPages}
    />
  );
}
