"use client";

import { useEffect, useState } from "react";
import {
  ContentDetailWrapper,
  DetailInfoWrapper,
} from "@/styles/pages/contentDetailWrapper";
import Image from "next/image";

export default function ContentDetailPage() {
  const [dummyData, setDummyData] = useState<any>([]);
  const dummyKeywordData = [
    "space travel",
    "time travel",
    "time machine",
    "sequel",
    "superhero",
    "ased on comic",
    "alien invasion",
    "superhero team",
    "marvel cinematic universe (mcu)",
    "alternate timeline",
    "father daughter relationship",
    "sister sister relationship",
  ];

  useEffect(() => {
    const dummy = {
      name: "Robert Downey Jr.",
      casting: "Tony Stark / Iron Man",
      image: "/images/testContentImg8.jpg",
    };

    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(dummy);
    }

    setDummyData(arr);
  }, []);

  return (
    <ContentDetailWrapper>
      <div className="mainInfo">
        <div>
          <div>
            <div className="poster">
              <div className="posterImg">
                <Image src="/images/testContentImg7.jpg" fill alt="posterImg" />
              </div>
              <div className="ottOffer"></div>
            </div>
            <div className="contentInfo">
              <div className="titleWrapper">
                <div className="title">
                  <span>어벤져스: 엔드게임</span> <span>(2019)</span>
                </div>
                <div>
                  <span className="age">12</span>
                  <span className="release">2019/04/24</span> <span>(KR)</span>
                  <span className="genre dot">모험,SF,액션</span>
                  <span className="runtime dot">3h 1m</span>
                </div>
              </div>
              <div className="score">
                <div className="scoreGauge">
                  <div>83%</div>
                </div>
                <div>
                  회원
                  <br />
                  점수
                </div>
                {/* <div>로그인 컨텐츠</div> */}
                <button className="trailBtn">
                  <div className="arrowImg"></div>
                  <div>트레일러 재생</div>
                </button>
              </div>
              <div className="summary">
                <div className="tagline">
                  운명을 바꿀 최후의 전쟁이 펼쳐진다
                </div>
                <div>개요</div>
                <div>
                  어벤져스의 패배 이후 지구는 초토화됐고 남은 절반의 사람들은
                  정신적 고통을 호소하며 하루하루를 근근이 버텨나간다.
                  와칸다에서 싸우다 생존한 히어로들과 우주의 타이탄 행성에서
                  싸우다 생존한 히어로들이 뿔뿔이 흩어졌는데, 아이언맨과
                  네뷸라는 우주를 떠돌고 있고 지구에 남아 있는 어벤져스 멤버들은
                  닉 퓨리가 마지막에 신호를 보내다 만 송신기만 들여다보며 혹시
                  모를 우주의 응답을 기다리는 중이다. 애초 히어로의 삶을 잠시
                  내려놓고 가족과 시간을 보내던 호크아이 역시 헤아릴 수 없는
                  마음의 상처를 입은 채 사라지고 마는데...
                </div>
              </div>
              <div className="producer">
                <ul>
                  <li>
                    <div>Larry Lieber</div>
                    <div>Characters</div>
                  </li>
                  <li>
                    <div>Larry Lieber</div>
                    <div>Characters</div>
                  </li>
                  <li>
                    <div>Larry Lieber</div>
                    <div>Characters</div>
                  </li>
                  <li>
                    <div>Larry Lieber</div>
                    <div>Characters</div>
                  </li>
                  <li>
                    <div>Larry Lieber</div>
                    <div>Characters</div>
                  </li>
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
                  {dummyData.map((val: any) => {
                    const { name, casting, image } = val;
                    return (
                      <li key={`${name}${casting}`}>
                        <div className="castImg">
                          <Image src={image} fill alt="castImg" />
                        </div>
                        <div className="castName">
                          <div className="name">{name}</div>
                          <div className="casting">{casting}</div>
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
              <div>Avengers: Endgame</div>
            </div>
            <div>
              <strong>상태</strong>
              <div>개봉됨</div>
            </div>
            <div>
              <strong>원어</strong>
              <div>영어</div>
            </div>
            <div>
              <strong>제작비</strong>
              <div>$356,000,000.00</div>
            </div>
            <div>
              <strong>수익</strong>
              <div>$2,800,000,000.00</div>
            </div>
            <div>
              <h4>키워드</h4>
              <ul>
                {dummyKeywordData.map((val: string, idx: number) => {
                  return <li key={`${val}${idx}`}>{val}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </DetailInfoWrapper>
    </ContentDetailWrapper>
  );
}
