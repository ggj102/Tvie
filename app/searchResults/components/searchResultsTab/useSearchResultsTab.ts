"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { searchResultsApi } from "@/lib/api/httpClient";

export default function useSearchResultsTab() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchVal = searchParams.get("search");

  const [tabData, setTabData] = useState<SearchResultsResType[]>([]);
  const [currentTab, setCurrentTab] = useState<string>();

  const typeConnect: ConnetType = {
    tv: "TV 프로그램",
    movie: "영화",
    person: "인물",
    collection: "컬렉션",
    company: "제작 및 배급사",
    keyword: "키워드",
  };

  useEffect(() => {
    const split = pathname.split("/");
    if (split.length > 2) {
      const replace = split[2].replace("Search", "");

      setCurrentTab(replace);
    }
  }, [pathname]);

  useEffect(() => {
    const search = searchParams.get("search");
    searchResultsApi(search).then((res) => {
      setTabData(res);
    });
  }, [searchParams.get("search")]);

  return {
    tabData,
    currentTab,
    typeConnect,
    searchVal,
  };
}
