"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { searchResultsApi } from "@/api/httpClient";
import { GlobalContext } from "@/app/context";

export default function useSearchResultsTab() {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
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
    setIsLoading(true);
    const search = searchParams.get("search");
    searchResultsApi(search).then((res) => {
      setTabData(res);
      setIsLoading(false);
    });
  }, []);

  return {
    isLoading,
    tabData,
    currentTab,
    typeConnect,
    searchVal,
  };
}
