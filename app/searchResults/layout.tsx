"use client";

import { useEffect, useState, KeyboardEvent, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { GlobalContext } from "../context";
import { searchResultsApi } from "@/api/httpClient";

import SearchIcon from "@mui/icons-material/Search";

import searchResultsStyles from "@styles/pages/searchResults/searchResults.module.scss";

export default function SearchResultsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const params = useSearchParams();
  const searchVal = params.get("search");
  const pathname = usePathname();
  const router = useRouter();

  const [searchData, setSearchData] = useState<SearchResultsResType[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const typeConnect: ConnetType = {
    tv: "TV 프로그램",
    movie: "영화",
    person: "인물",
    collection: "컬렉션",
    company: "제작 및 배급사",
    keyword: "키워드",
  };

  const onKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
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
    setIsLoading(true);
    searchResultsApi(searchVal).then((res) => {
      setSearchData(res);
      setIsLoading(false);
    });
  }, [pathname]);

  return (
    !isLoading && (
      <>
        <div className={searchResultsStyles.search_bar}>
          <div className={searchResultsStyles.search_input}>
            <SearchIcon />
            <input
              value={inputValue}
              placeholder="영화, TV 프로그램, 인물 검색"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDownSearch}
            />
          </div>
        </div>
        <div className={searchResultsStyles.search_results}>
          <div className={searchResultsStyles.category_tab}>
            <div>Search Results</div>
            <ul>
              {searchData.map((val: SearchResultsResType, idx: number) => {
                const categoryName = typeConnect[val.type];

                return (
                  <li
                    key={`${val.type}${idx}`}
                    className={
                      val.type === currentTab
                        ? searchResultsStyles.current_tab
                        : ""
                    }
                  >
                    <Link
                      href={`/searchResults/${val.type}Search?search=${searchVal}`}
                    >
                      <span className={searchResultsStyles.category_name}>
                        {categoryName}
                      </span>
                      <span className={searchResultsStyles.total}>
                        {val.data.total_results}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={searchResultsStyles.list}>{children}</div>
        </div>
      </>
    )
  );
}
