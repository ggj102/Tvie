"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { apiClient } from "@/api/httpClient";

import { Pagination } from "@mui/material";
import SearchResultsList from "../../../components/pages/searchResults/searchResultsList";
import { ContentDataType } from "@/components/pages/contents/contents";

export default function MovieSearchPage() {
  const params = useSearchParams();
  const searchVal = params.get("search");
  const query = `query=${searchVal}&include_adult=false&language=ko&page=`;
  const [searchData, setSearchData] = useState<ContentDataType[]>([]);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePagination = (e: ChangeEvent<unknown>, page: number) => {
    apiClient.get(`search/movie?${query}${page}`).then((res) => {
      setSearchData(res.data.results);
      setCurrentPage(page);

      window.scrollTo({ top: 0 });
    });
  };

  useEffect(() => {
    apiClient.get(`search/movie?${query}1`).then((res) => {
      setSearchData(res.data.results);
      setTotalPages(res.data.total_pages);
    });
  }, []);

  return (
    <div className="searchResultsList">
      <SearchResultsList type="movie" list={searchData} />
      {totalPages !== 1 && (
        <div className="pagination">
          <Pagination
            count={totalPages}
            page={currentPage}
            defaultPage={1}
            boundaryCount={2}
            siblingCount={3}
            hidePrevButton={currentPage === 1}
            hideNextButton={currentPage === totalPages}
            onChange={onChangePagination}
          />
        </div>
      )}
    </div>
  );
}
