import { apiClient } from "@/api/httpClient";
import { getSession } from "@auth0/nextjs-auth0";

import Person from "./components/person";
import { initFavoritesList } from "@/api/authZero";

async function ServerSideProps() {
  const session = await getSession();
  const isSession = !!session;

  const personData = await apiClient.get("person/popular?language=ko&page=1");
  const personList = await initFavoritesList(personData.data.results);
  const totalPages = personData.data.total_pages;

  return { isSession, personList, totalPages };
}

export default async function PersonPage() {
  const { isSession, personList, totalPages } = await ServerSideProps();

  return (
    <Person isSession={isSession} list={personList} totalPages={totalPages} />
  );
}
