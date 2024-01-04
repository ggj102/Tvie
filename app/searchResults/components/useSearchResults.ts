"use client";

import { ChangeEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

import { apiClient } from "@/api/httpClient";
import { addFavoritesList } from "@/api/authZero";

export default function useSearchResults(type: string, list: any) {
  const params = useSearchParams();
  const searchVal = params.get("search");
  const query = `query=${searchVal}&include_adult=false&language=ko&page=`;
  const [searchData, setSearchData] = useState<any>(list);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePagination = (e: ChangeEvent<unknown>, page: number) => {
    apiClient.get(`search/${type}?${query}${page}`).then((res) => {
      addFavoritesList(res.data.results).then((addData) => {
        setSearchData(addData);
        setCurrentPage(page);

        window.scrollTo({ top: 0 });
      });
    });
  };

  return {
    searchData,
    currentPage,
    onChangePagination,
  };
}
