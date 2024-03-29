import { ChangeEvent, useState } from "react";
import { apiClient } from "@/lib/api/httpClient";
import { addFavoritesList } from "@/lib/api/authZero";

export default function usePerson(list: PersonDataType[]) {
  const [personData, setPersonData] = useState<PersonDataType[]>(list);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePagination = (e: ChangeEvent<unknown>, page: number) => {
    apiClient.get(`person/popular?language=ko&page=${page}`).then((res) => {
      addFavoritesList(res.data.results).then((addData) => {
        setPersonData(addData);
        setCurrentPage(page);

        window.scrollTo({ top: 0 });
      });
    });
  };

  return {
    personData,
    currentPage,
    onChangePagination,
  };
}
