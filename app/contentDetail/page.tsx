"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { contentDetailApi } from "@/api/httpClient";
import {
  ContentDetailWrapper,
  DetailInfoWrapper,
} from "@/styles/pages/contentDetailWrapper";

export default function ContentDetailPage() {
  const params = useSearchParams();
  const [isTypeTV, setIsTypeTV] = useState<boolean>(false);
  const [contentData, setContentData] = useState<any>({
    backdrop_path: "",
    poster_path: "",
    genres: [],
    created_by: [],
  });
  const [keywordData, setKeywordData] = useState<any>({
    keywords: [],
    results: [{ id: -1, name: "" }],
  });
  const [creditsData, setCreditsData] = useState<any>([]);
  const [date, setDate] = useState<any>({
    year: "",
    month: "",
    day: "",
  });

  const dollarFormatter = (dollar: number) => {
    const strDollar = `${dollar}`;
    const arr = [];
    for (let i = strDollar.length - 1; i >= 0; i--) {
      arr.unshift(`${strDollar[i]}`);
      if (i % 3 === 0 && i !== 0) arr.unshift(",");
    }

    const format = arr.join("");

    return `$${format}.00`;
  };

  const runtimeFormatter = (runtime: number) => {
    if (runtime < 60) return `${runtime}m`;
    if (runtime % 60 === 0) return `${runtime / 60}h`;

    const minute = runtime % 60;
    const hour = (runtime - minute) / 60;

    return `${hour}h ${minute}m`;
  };

  useEffect(() => {
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

      setContentData(contents.data);
      setCreditsData(slice);
      setKeywordData(keywords.data);

      setDate({
        ...date,
        year: dateSplit[0],
        month: dateSplit[1],
        day: dateSplit[2],
      });
    });
  }, []);

  return (
    <ContentDetailWrapper bgUrl={contentData.backdrop_path}>
      <div className="mainInfo">
        <div>
          <div>
            <div className="poster">
              <div className="posterImg">
                <Image
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${contentData.poster_path}`}
                  fill
                  sizes="1x"
                  alt="posterImg"
                />
              </div>
              <div className="ottOffer"></div>
            </div>
            <div className="contentInfo">
              <div className="titleWrapper">
                <div className="title">
                  <span>{isTypeTV ? contentData.name : contentData.title}</span>{" "}
                  <span>({date.year})</span>
                </div>
                <div>
                  {/* <span className="age">12</span> */}
                  {!isTypeTV && (
                    <span className="release">
                      <span>{`${date.year}/${date.month}/${date.day}`}</span>{" "}
                      <span>(KR)</span>
                    </span>
                  )}
                  <span className="genre">
                    {contentData.genres.map(
                      (val: any, idx: number, arr: any) => {
                        return (
                          <Link key={`${val.name}${idx}`} href="">
                            {val.name}
                            {idx !== arr.length - 1 ? ", " : ""}
                          </Link>
                        );
                      }
                    )}
                  </span>
                  {!isTypeTV && (
                    <span className="runtime dot">
                      {runtimeFormatter(contentData.runtime)}
                    </span>
                  )}
                </div>
              </div>
              <div className="score">
                <div className="scoreGauge">
                  <div>{`${Math.floor(contentData.vote_average * 10)}%`}</div>
                </div>
                <div>
                  회원
                  <br />
                  점수
                </div>
                {/* <div>로그인 컨텐츠</div> */}
                {/* <button className="trailBtn">
                  <div className="arrowImg"></div>
                  <div>트레일러 재생</div>
                </button> */}
              </div>
              <div className="summary">
                <div className="tagline">{contentData.tagline}</div>
                <div>개요</div>
                <div>{contentData.overview}</div>
              </div>
              <div className="producer">
                <ul>
                  {isTypeTV &&
                    contentData.created_by.map((val: any, idx: number) => {
                      return (
                        <li key={`${val.name}${idx}`}>
                          <div>
                            <Link href="">{val.name}</Link>
                          </div>
                          <div>창작자</div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailInfoWrapper>
        <div>
          <div className="detailInfo">
            <div className="mainCast">
              <div className="infoTitle">주요 출연진</div>
              <div className="castList">
                <ul>
                  {creditsData.map((val: any) => {
                    const { id, name, roles, profile_path, character } = val;
                    return (
                      <li key={id}>
                        <div className="castImg">
                          <Link href={`/personDetail?id=${id}`}>
                            <Image
                              src={`https://image.tmdb.org/t/p/w138_and_h175_face/${profile_path}`}
                              fill
                              sizes="1x"
                              alt="castImg"
                            />
                          </Link>
                        </div>
                        <div className="castName">
                          <div className="name">
                            <Link href={`/personDetail?id=${id}`}>{name}</Link>
                          </div>
                          <div className="casting">
                            {isTypeTV ? roles[0].character : character}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="sideInfo">
            <div>
              <strong>원제</strong>
              <div>
                {isTypeTV
                  ? contentData.original_name
                  : contentData.original_title}
              </div>
            </div>
            <div>
              <strong>상태</strong>
              <div>{contentData.status}</div>
            </div>
            <div>
              <strong>원어</strong>
              <div>{contentData.original_language}</div>
            </div>
            {!isTypeTV && (
              <>
                <div>
                  <strong>제작비</strong>
                  <div>{dollarFormatter(contentData.budget)}</div>
                </div>
                <div>
                  <strong>수익</strong>
                  <div>{dollarFormatter(contentData.revenue)}</div>
                </div>
              </>
            )}

            <div>
              <h4>키워드</h4>
              <ul>
                {isTypeTV
                  ? keywordData.results.map((val: any, idx: number) => {
                      return (
                        <li key={`${val.name}${idx}`}>
                          {/* <Link href="">{val.name}</Link> */}
                          {val.name}
                        </li>
                      );
                    })
                  : keywordData.keywords.map((val: any, idx: number) => {
                      return (
                        <li key={`${val.name}${idx}`}>
                          {/* <Link href="">{val.name}</Link> */}
                          {val.name}
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>
        </div>
      </DetailInfoWrapper>
    </ContentDetailWrapper>
  );
}
