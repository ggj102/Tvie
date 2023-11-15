"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SearchResultsWrapper } from "@/styles/pages/searchResults/searchResultsWrapper";
import { searchResultsApi } from "@/api/httpClient";

import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export default function SearchResultsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const searchVal = params.get("search");
  const pathname = usePathname();
  const router = useRouter();

  const [searchData, setSearchData] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const typeConnect: any = {
    tv: "TV 프로그램",
    movie: "영화",
    person: "인물",
    collection: "컬렉션",
    company: "제작 및 배급사",
    keyword: "키워드",
  };

  const onKeyDownSearch = (e: any) => {
    if (e.key === "Enter") {
      router.push(`/searchResults?search=${inputValue}`);
    }
  };

  useEffect(() => {
    const pathSplit = pathname.split("/");

    if (pathSplit.length > 1) {
      const nameReplace = pathSplit[pathSplit.length - 1].replace("Search", "");
      setCurrentTab(nameReplace);
    }
  }, [pathname]);

  useEffect(() => {
    searchResultsApi(searchVal).then((res: any) => {
      setSearchData(res);
    });
  }, [pathname]);

  return (
    <SearchResultsWrapper>
      <div className="searchBar">
        <div className="searchInput">
          <SearchIcon />
          <input
            value={inputValue}
            placeholder="영화, TV 프로그램, 인물 검색"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDownSearch}
          />
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
                    <Link
                      href={`/searchResults/${val.type}Search?search=${searchVal}`}
                    >
                      <span className="category">{categoryName}</span>
                      <span className="total">{val.data.total_results}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </SearchResultsWrapper>
  );
}
