"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchResultsApi } from "@/lib/api/httpClient";
import Loading from "../../components/loading";

export default function SearchResultsPage() {
  const params = useSearchParams();
  const searchVal = params.get("search");
  const router = useRouter();

  useEffect(() => {
    searchResultsApi(searchVal).then((res) => {
      router.replace(`/searchResults/${res[0].type}Search?search=${searchVal}`);
    });
  }, []);

  return <Loading />;
}
