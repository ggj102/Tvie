import { apiClient } from "@/api/httpClient";
import PersonList from "../components/personList";

async function ServerSideProps(searchParams: any) {
  const { search } = searchParams;
  const query = `query=${search}&include_adult=false&language=ko&page=`;

  const searchPerson = await apiClient.get(`search/person?${query}1`);
  const list = searchPerson.data.results;
  const totalPages = searchPerson.data.total_pages;

  return { list, totalPages };
}

export default async function PersonSearchPage({ searchParams }: any) {
  const { list, totalPages } = await ServerSideProps(searchParams);

  return <PersonList list={list} totalPages={totalPages} />;
}
