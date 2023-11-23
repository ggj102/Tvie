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
  const [movieInfolData, setMovieInfolData] = useState<MovieInfoType>(() => {
    return {} as MovieInfoType;
  });
  const [tvInfolData, setTvInfolData] = useState<TVShowInfoType>(() => {
    return {} as TVShowInfoType;
  });

  const [keywordData, setKeywordData] = useState<KeywordType[]>([]);
  const [castData, setCastData] = useState<CastInfoType[]>([]);
  const [date, setDate] = useState<{
    year: string;
    month: string;
    day: string;
  }>({
    year: "",
    month: "",
    day: "",
  });

  useEffect(() => {
    setIsLoading(true);
    const contentType = params.get("type");
    const contentId = params.get("id");

    setIsTypeTV(contentType === "tv");

    contentDetailApi(contentId, contentType).then((res) => {
      const [contents, credits, keywords] = res;
      const contentDate =
        contents.data.first_air_date || contents.data.release_date;

      const dateSplit = contentDate.split("-");
      const slice = credits.data.cast.slice(0, 9);

      if (contentType === "tv") setTvInfolData(contents.data);
      else setMovieInfolData(contents.data);
      setCastData(slice);
      setKeywordData(keywords.data.keywords || keywords.data.results);

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
        <TopInfo
          isTypeTV={isTypeTV}
          movieInfolData={movieInfolData}
          tvInfolData={tvInfolData}
          date={date}
        />
        <div className={contentsDetailStyles.detail_info}>
          <MainCast isTypeTV={isTypeTV} castData={castData} />
          <SideInfo
            isTypeTV={isTypeTV}
            movieInfolData={movieInfolData}
            tvInfolData={tvInfolData}
            keywordData={keywordData}
          />
        </div>
      </>
    )
  );
}
