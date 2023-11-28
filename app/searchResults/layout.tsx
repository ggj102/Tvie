"use client";

import SearchResultsTab from "./components/searchResultsTab";
import searchResultsStyles from "@styles/pages/searchResults/searchResults.module.scss";

export default function SearchResultsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={searchResultsStyles.search_results}>
      <SearchResultsTab />
      <div className={searchResultsStyles.list}>{children}</div>
    </div>
  );
}
