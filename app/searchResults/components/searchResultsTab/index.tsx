"use client";

import Link from "next/link";

import useSearchResultsTab from "./useSearchResultsTab";

import searchResultsStyles from "@styles/pages/searchResults/searchResults.module.scss";

export default function SearchResultsTab() {
  const { tabData, currentTab, typeConnect, searchVal } = useSearchResultsTab();

  return (
    <div className={searchResultsStyles.category_tab}>
      <div>Search Results</div>
      <ul>
        {tabData.map((val: SearchResultsResType, idx: number) => {
          const categoryName = typeConnect[val.type];

          return (
            <li
              key={`${val.type}${idx}`}
              className={
                val.type === currentTab ? searchResultsStyles.current_tab : ""
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
  );
}
