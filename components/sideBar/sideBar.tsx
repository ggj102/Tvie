"use client";

import { useEffect, useRef, useState } from "react";
import SideBarCard from "./sideBarCard";
import { SideBarWrapper } from "@/styles/components/sideBar/sideBarWrapper";
import Availabilities from "./sideBarCardContents/availabilities";
import Genre from "./sideBarCardContents/genre";
import CustomSlider from "../customSlider";
import CustomSelect from "../customSelect";
import ReleaseDates from "./sideBarCardContents/releaseDates";
import Certification from "./sideBarCardContents/certification";

export default function SideBar() {
  const [rangeVal, setRangeVal] = useState<number>(0);
  const [rangeVal2, setRangeVal2] = useState<number>(0);

  const [scoreValue, setScoreValue] = useState<number[]>([0, 10]);
  const [votesValue, setVotesValue] = useState<number>(0);
  const [runtimeValue, setRuntimeValue] = useState<number[]>([0, 400]);

  const onChangeScore = (e: Event, newValue: number | number[]) => {
    setScoreValue(newValue as number[]);
  };

  const onChangeVotes = (e: Event, newValue: number) => {
    setVotesValue(newValue);
  };

  const onChangeRuntime = (e: Event, newValue: number | number[]) => {
    setRuntimeValue(newValue as number[]);
  };

  return (
    <SideBarWrapper>
      <SideBarCard title="정렬" defaultOpen={true}>
        <div className="cardContent">
          <div>Sort Results By</div>
          {/* <CustomSelect /> */}
          <select>
            <option>인기도 내림차순</option>
            <option>인기도 오름차순</option>
            <option>평점 내림차순</option>
            <option>평점 오름차순</option>
            <option>상영일 내림차순</option>
            <option>상영일 오름차순</option>
            <option>제목 내림차순</option>
            <option>제목 오름차순</option>
          </select>
        </div>
      </SideBarCard>
      <SideBarCard title="Where To Watch" defaultOpen={true}>
        <div className="cardContent">
          <div>Country</div>
          <select>
            <option>대한민국</option>
          </select>
          <div></div>
        </div>
      </SideBarCard>
      <SideBarCard title="필터" defaultOpen={true}>
        <Availabilities />
        <ReleaseDates />
        <Genre />
        <Certification />
        <div className="cardContent">
          <div>언어</div>
        </div>
        <div className="cardContent">
          <div>User Score</div>
          <div className="slider">
            <CustomSlider
              max={10}
              step={1}
              pointNum={5}
              sliderValue={scoreValue}
              onChange={onChangeScore}
            />
          </div>
        </div>
        <div className="cardContent">
          <div>Minimum User Votes</div>
          <div className="slider">
            <CustomSlider
              max={500}
              step={50}
              pointNum={100}
              sliderValue={votesValue}
              onChange={onChangeVotes}
            />
          </div>
        </div>
        <div className="cardContent">
          <div>Runtime</div>
          <div className="slider">
            <CustomSlider
              max={400}
              step={15}
              pointNum={120}
              sliderValue={runtimeValue}
              onChange={onChangeRuntime}
            />
          </div>
        </div>
        <div className="cardContent">
          <div>키워드 </div>
          <input className="keywordInput" placeholder="필터할 단어..." />
        </div>
      </SideBarCard>
      <button className="submitBtn">검색</button>
    </SideBarWrapper>
  );
}
