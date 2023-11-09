"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "./index/searchBar";
import { IndexWrapper } from "@/styles/pages/index/indexWrapper";
import Link from "next/link";
import HomeFilterBar from "./index/homeFilterBar";
import ContentLayout from "@/components/contentLayout";
import { apiClient } from "@/api/httpClient";
import { dateFormater } from "@/utils/dateFormater";

export default function Home() {
  const [data, setData] = useState<any>();
  const [currentTrendingTab, setCurrentTrendingTab] = useState<string>("day");
  const contentsArr = [
    {
      category: "인기 급상승",
      className: "trending",
      data,
      filter: ["day", "week"],
    },
    // {
    //   category: "최신 예고편",
    //   className: "latestNotice",
    //   data: [],
    //   filter: ["인기", "스트리밍", "TV", "대여", "극장"],
    // },
    // {
    //   category: "인기",
    //   className: "popular",
    //   data: [],
    //   filter: ["스트리밍", "TV", "대여", "극장"],
    // },
    // {
    //   category: "무료시청",
    //   className: "free",
    //   data: [],
    //   filter: ["영화", "TV"],
    // },
  ];

  const onClickTrendingTab = (value: string) => {
    setCurrentTrendingTab(value);
  };

  useEffect(() => {
    apiClient
      .get(`trending/all/${currentTrendingTab}?language=ko`)
      .then((res) => {
        setData(res.data.results);
      });
  }, [currentTrendingTab]);

  return (
    <ContentLayout>
      <IndexWrapper>
        <SearchBar />
        {contentsArr.map((val, idx) => {
          const { category, className, filter } = val;

          return (
            <div className={`content ${className}`} key={`${category}${idx}`}>
              <div className="titleBar">
                <h2>{category}</h2>
                <HomeFilterBar
                  filter={filter}
                  currentTab={currentTrendingTab}
                  onClick={onClickTrendingTab}
                />
              </div>
              <ul className="contentList">
                {data &&
                  data.map((val: any, idx: number) => {
                    const { poster_path, vote_average } = val;
                    const vote = `${Math.floor(vote_average * 10)}%`;
                    const date = val.first_air_date || val.release_date;

                    return (
                      <li key={`trending${idx}`}>
                        <Link href="">
                          <div className="contentImg">
                            <Image
                              src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
                              fill
                              sizes="1x"
                              alt="contentImg"
                            />
                          </div>
                          <div className="score">{vote}</div>
                          <div className="titleRelease">
                            <div className="title">{val.name || val.title}</div>
                            <div className="release">{dateFormater(date)}</div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </IndexWrapper>
    </ContentLayout>
  );
}
