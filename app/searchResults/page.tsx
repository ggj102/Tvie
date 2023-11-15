"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchResultsApi } from "@/api/httpClient";

export default function SearchResultsPage() {
  const params = useSearchParams();
  const searchVal = params.get("search");
  const router = useRouter();

  useEffect(() => {
    searchResultsApi(searchVal).then((res: any) => {
      router.replace(`/searchResults/${res[0].type}Search?search=${searchVal}`);
    });
  }, []);

  return <>검색 결과 페이지</>;
}
