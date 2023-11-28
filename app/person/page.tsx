import { apiClient } from "@/api/httpClient";
import Person from "./components/person";

async function ServerSideProps() {
  const personData = await apiClient.get("person/popular?language=ko&page=1");
  const personList = personData.data.results;
  const totalPages = personData.data.total_pages;

  return { personList, totalPages };
}

export default async function PersonPage() {
  const { personList, totalPages } = await ServerSideProps();

  return <Person list={personList} totalPages={totalPages} />;
}
