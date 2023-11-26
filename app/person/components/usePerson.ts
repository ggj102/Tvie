import { apiClient } from "@/api/httpClient";
import { ChangeEvent, useState } from "react";

export default function usePerson(list: PersonDataType[]) {
  const [personData, setPersonData] = useState<PersonDataType[]>(list);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePagination = (e: ChangeEvent<unknown>, page: number) => {
    apiClient.get(`person/popular?language=ko&page=${page}`).then((res) => {
      setPersonData(res.data.results);
      setCurrentPage(page);

      window.scrollTo({ top: 0 });
    });
  };

  return {
    personData,
    currentPage,
    onChangePagination,
  };
}
