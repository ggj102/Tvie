"use client";

import Image from "next/image";
import SearchBar from "./index/searchBar";
import { IndexWrapper } from "@/styles/pages/index/indexWrapper";
import Link from "next/link";
import HomeFilterBar from "./index/homeFilterBar";

export default function Home() {
  const contentsArr = [
    {
      category: "인기 급상승",
      className: "trending",
      data: [],
      filter: ["오늘", "이번 주"],
    },
    {
      category: "최신 예고편",
      className: "latestNotice",
      data: [],
      filter: ["인기", "스트리밍", "TV", "대여", "극장"],
    },
    {
      category: "인기",
      className: "popular",
      data: [],
      filter: ["스트리밍", "TV", "대여", "극장"],
    },
    {
      category: "무료시청",
      className: "free",
      data: [],
      filter: ["영화", "TV"],
    },
  ];

  return (
    <IndexWrapper>
      <SearchBar />
      {contentsArr.map((val, idx) => {
        const { category, className, filter } = val;

        //임시 데이터 복사 로직
        const dummyData = [];

        for (let i = 0; i < 30; i++) {
          dummyData.push({
            title: "베니스 유령 살인 사건",
            image: "/images/testContentImg.jpg",
            release: "9월 13, 2023",
            score: "68%",
          });
        }
        // 임시 데이터 복사 로직

        return (
          <div className={`content ${className}`} key={`${category}${idx}`}>
            <div className="titleBar">
              <h2>{category}</h2>
              <HomeFilterBar filter={filter} />
            </div>
            <ul className="contentList">
              {dummyData &&
                dummyData.map((val, idx) => {
                  const { title, image, release, score } = val;

                  return (
                    <li key={`${title}${idx}`}>
                      <Link href="">
                        <div className="contentImg">
                          <Image src={image} fill alt="contentImg" />
                        </div>
                        <div className="score">{score}</div>
                        <div className="titleRelease">
                          <div className="title">{title}</div>
                          <div className="release">{release}</div>
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
  );
}
