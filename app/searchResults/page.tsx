"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SearchResultsWrapper } from "@/styles/components/searchResults/searchResultsWrapper";
import { searchResultsApi } from "@/api/httpClient";

import SearchResultsList from "./components/searchResultsList";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchResultsPage() {
  const params = useSearchParams();

  const [searchData, setSearchData] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [currentData, setCurrentData] = useState<any>({
    type: "",
    data: { results: [] },
  });

  useEffect(() => {
    const searchVal = params.get("search");

    searchResultsApi(searchVal).then((res: any) => {
      setSearchData(res);
      setCurrentTab(res[0].type);
      setCurrentData(res[0]);
    });
  }, []);

  useEffect(() => {
    if (currentTab) {
      const filter = searchData.filter((val: any) => val.type === currentTab);
      setCurrentData(filter[0]);
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
                return (
                  <li
                    key={`${val.type}${idx}`}
                    className={val.type === currentTab ? "currentTab" : ""}
                  >
                    <button onClick={() => setCurrentTab(val.type)}>
                      <span className="category">{val.type}</span>
                      <span className="total">{val.data.total_results}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="searchResultsList">
            <SearchResultsList list={currentData} />
            <div className="pagination">
              <div>페이지네이션</div>
            </div>
          </div>
        </div>
      </div>
    </SearchResultsWrapper>
  );
}
