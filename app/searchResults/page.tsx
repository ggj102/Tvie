"use client";

import { useEffect, useState } from "react";
import { SearchResultsWrapper } from "@/styles/pages/searchResultsWrapper";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

export default function SearchResultsPage() {
  const [dummyData, setDummyData] = useState<any>([]);

  useEffect(() => {
    const dummy = {
      title: "스파이더맨: 노 웨이 홈",
      release: "12월 15, 2021",
      sub: "미스테리오의 계략으로 세상에 정체가 탄로난 스파이더맨 피터 파커는 하루 아침에 평범한 일상을 잃게 된다. 문제를 해결하기 위해 닥터 스트레인지를 찾아가 도움을 청하지만 뜻하지 않게 멀티버스가 열리면서 각기 다른 차원의 불청객들이 나타난다. 닥터 옥토퍼스를 비롯해 스파이더맨에게 깊은 원한을 가진 숙적들의 강력한 공격에 피터 파커는 사상 최악의 위기를 맞게 되는데…",
      image: "/images/testContentImg4.jpg",
    };

    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(dummy);
    }

    setDummyData(arr);
  }, []);

  return (
    <SearchResultsWrapper>
      <div className="searchBar">
        <div className="searchInput">
          <SearchIcon />
          <input placeholder="영화, TV 프로그램, 인물 검색" />
        </div>
      </div>
      <div>
        <div>
          <div className="sideBar">
            <div>Search Results</div>
            <ul>
              <li>
                <a>TV 프로그램</a>
                <span>693</span>
              </li>
              <li>
                <a>영화</a>
                <span>2315</span>
              </li>
              <li>
                <a>컬렉션</a>
                <span>57</span>
              </li>
              <li>
                <a>인물</a>
                <span>237</span>
              </li>
              <li>
                <a>키워드</a>
                <span>4</span>
              </li>
              <li>
                <a>방송사</a>
                <span>1</span>
              </li>
              <li>
                <a>제작 및 배급사</a>
                <span>6</span>
              </li>
            </ul>
          </div>
          <div className="searchResultsList">
            <ul>
              {dummyData.map((val: any, idx: number) => {
                const { title, release, sub, image } = val;
                return (
                  <li key={`${title}${idx}`}>
                    <div className="contentImage">
                      <Image src={image} fill alt="image" />
                    </div>
                    <div className="contentInfo">
                      <a>{title}</a>
                      <div>{release}</div>
                      <div>{sub}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="pagination">
              <div>페이지네이션</div>
            </div>
          </div>
        </div>
      </div>
    </SearchResultsWrapper>
  );
}
