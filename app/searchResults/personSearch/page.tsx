import { apiClient } from "@/lib/api/httpClient";
import PersonList from "../components/personList";
import { initFavoritesList } from "@/lib/api/authZero";
import { getSession } from "@auth0/nextjs-auth0";

async function ServerSideProps(searchParams: any) {
  const { search } = searchParams;
  const session = await getSession();
  const isSession = !!session;

  const query = `query=${search}&include_adult=false&language=ko&page=`;

  const searchPerson = await apiClient.get(`search/person?${query}1`);
  const list = await initFavoritesList(searchPerson.data.results);
  const totalPages = searchPerson.data.total_pages;

  return { isSession, list, totalPages };
}

export default async function PersonSearchPage({ searchParams }: any) {
  const { isSession, list, totalPages } = await ServerSideProps(searchParams);

  return (
    <PersonList isSession={isSession} list={list} totalPages={totalPages} />
  );
}
