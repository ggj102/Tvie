"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SearchResultsWrapper } from "@/styles/components/searchResults/searchResultsWrapper";
import { apiClient, searchResultsApi } from "@/api/httpClient";

import SearchResultsList from "./components/searchResultsList";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "@mui/material";

export default function SearchResultsPage() {
  const params = useSearchParams();
  const searchVal = params.get("search");

  const [searchData, setSearchData] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [currentData, setCurrentData] = useState<any>({
    type: "",
    data: { results: [] },
  });
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const typeConnect: any = {
    tv: "TV 프로그램",
    movie: "영화",
    person: "인물",
    collection: "컬렉션",
    company: "제작 및 배급사",
    keyword: "키워드",
  };

  const onChangePagination = (e: any, page: any) => {
    const query = `query=${searchVal}&include_adult=false&language=ko&page=${page}`;
    apiClient.get(`search/${currentTab}?${query}`).then((res) => {
      setCurrentData({ ...currentData, data: res.data });
      setCurrentPage(page);

      window.scrollTo({ top: 0 });
    });
  };

  useEffect(() => {
    searchResultsApi(searchVal).then((res: any) => {
      setSearchData(res);
      setCurrentTab(res[0].type);
      setCurrentData(res[0]);
      setTotalPages(res[0].data.total_pages);
    });
  }, []);

  useEffect(() => {
    if (currentTab) {
      if (currentPage !== 1) {
        const query = `query=${searchVal}&include_adult=false&language=ko&page=1`;
        apiClient.get(`search/${currentTab}?${query}`).then((res) => {
          setCurrentData({ ...currentData, currentTab, data: res.data });
          setCurrentPage(1);
          setTotalPages(res.data.total_pages);

          window.scrollTo({ top: 0 });
        });
      } else {
        const filter = searchData.filter((val: any) => val.type === currentTab);

        setCurrentData(filter[0]);
        setTotalPages(filter[0].data.total_pages);
      }
    }
  }, [currentTab]);

  return (
    <SearchResultsWrapper>
      <div className="searchBar">
        <div className="searchInput">
          <SearchIcon />
          <input placeholder="영화, TV 프로그램, 인물 검색" />
        </div>
      </div>
      <div>
        <div>
          <div className="sideBar">
            <div>Search Results</div>
            <ul>
              {searchData.map((val: any, idx: number) => {
                const categoryName = typeConnect[val.type];

                return (
                  <li
                    key={`${val.type}${idx}`}
                    className={val.type === currentTab ? "currentTab" : ""}
                  >
                    <button onClick={() => setCurrentTab(val.type)}>
                      <span className="category">{categoryName}</span>
                      <span className="total">{val.data.total_results}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="searchResultsList">
            <SearchResultsList list={currentData} />
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
        </div>
      </div>
    </SearchResultsWrapper>
  );
}
