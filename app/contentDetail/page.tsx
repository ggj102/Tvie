"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { GlobalContext } from "../context";
import { contentDetailApi } from "@/api/httpClient";

import TopInfo from "@/components/pages/contentsDetail/topInfo";
import MainCast from "@/components/pages/contentsDetail/mainCast";
import SideInfo from "@/components/pages/contentsDetail/sideInfo";

import contentsDetailStyles from "@styles/pages/contentsDetail/contentsDetail.module.scss";

export default function ContentDetailPage() {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const params = useSearchParams();
  const [isTypeTV, setIsTypeTV] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<any>({
    backdrop_path: "",
    poster_path: "",
    genres: [],
    created_by: [],
  });
  const [keywordData, setKeywordData] = useState<any>({
    keywords: [],
    results: [{ id: -1, name: "" }],
  });
  const [castData, setCastData] = useState<any>([]);
  const [date, setDate] = useState<any>({
    year: "",
    month: "",
    day: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const contentType = params.get("type");
    const contentId = params.get("id");

    setIsTypeTV(contentType === "tv");

    contentDetailApi(contentId, contentType).then((res: any) => {
      const [contents, credits, keywords] = res;
      const contentDate =
        contentType === "tv"
          ? contents.data.first_air_date
          : contents.data.release_date;
      const dateSplit = contentDate.split("-");
      const slice = credits.data.cast.slice(0, 9);

      setDetailData(contents.data);
      setCastData(slice);
      setKeywordData(keywords.data);

      setDate({
        ...date,
        year: dateSplit[0],
        month: dateSplit[1],
        day: dateSplit[2],
      });
      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <>
        <TopInfo isTypeTV={isTypeTV} detailData={detailData} date={date} />
        <div className={contentsDetailStyles.detail_info}>
          <MainCast isTypeTV={isTypeTV} castData={castData} />
          <SideInfo
            isTypeTV={isTypeTV}
            detailData={detailData}
            keywordData={keywordData}
          />
        </div>
      </>
    )
  );
}
