"use client";

import { usePathname } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import SideBarCard from "./sideBarCard";
import Availabilities from "./sideBarCardContents/availabilities";
import Genre from "./sideBarCardContents/genre";
import CustomSlider from "../customSlider";
import ReleaseDates from "./sideBarCardContents/releaseDates";
// import Certification from "./sideBarCardContents/certification";

import { SideBarWrapper } from "@/styles/components/sideBar/sideBarWrapper";

export default function SideBar({ defaultData, onSubmit }: any) {
  const pathname = usePathname();

  const { control, setValue, handleSubmit, reset } = useForm<any>({
    defaultValues: { ...defaultData },
  });

  return (
    <SideBarWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <SideBarCard title="정렬" defaultOpen={true}>
          <div className="cardContent">
            <div>Sort Results By</div>
            {/* <CustomSelect /> */}
            <Controller
              name="sort_by"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="popularity.desc">인기도 내림차순</option>
                  <option value="popularity.asc">인기도 오름차순</option>
                  <option value="vote_count.desc">평점 내림차순</option>
                  <option value="vote_count.asc">평점 오름차순</option>
                  <option value="primary_release_date.desc">
                    상영일 내림차순
                  </option>
                  <option value="primary_release_date.asc">
                    상영일 오름차순
                  </option>
                  <option value="revenue.desc">제목 내림차순</option>
                  <option value="revenue.asc">제목 오름차순</option>
                </select>
              )}
            />
          </div>
        </SideBarCard>
        {/* <SideBarCard title="Where To Watch" defaultOpen={true}>
          <div className="cardContent">
            <div>Country</div>
            <select>
              <option>대한민국</option>
            </select>
            <div></div>
          </div>
        </SideBarCard> */}
        <SideBarCard title="필터" defaultOpen={true}>
          <Availabilities control={control} />
          <ReleaseDates control={control} />
          <Genre setValue={setValue} />
          {/* <Certification setValue={setValue} /> */}
          {/* {pathname === "/tv" && (
            <div className="cardContent">
              <div>방송사</div>
              <input />
            </div>
          )} */}
          {/* <div className="cardContent">
            <div>언어</div>
          </div> */}
          <div className="cardContent">
            <div>User Score</div>
            <div className="slider">
              <Controller
                name="vote_average"
                control={control}
                render={({ field }) => (
                  <CustomSlider
                    max={10}
                    step={1}
                    pointNum={5}
                    sliderValue={field.value}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="cardContent">
            <div>Minimum User Votes</div>
            <div className="slider">
              <Controller
                name="vote_count"
                control={control}
                render={({ field }) => (
                  <CustomSlider
                    max={500}
                    step={50}
                    pointNum={100}
                    sliderValue={field.value}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="cardContent">
            <div>Runtime</div>
            <div className="slider">
              <Controller
                name="runtime"
                control={control}
                render={({ field }) => (
                  <CustomSlider
                    max={400}
                    step={15}
                    pointNum={120}
                    sliderValue={field.value}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          {/* <div className="cardContent">
            <div>키워드 </div>
            <input className="keywordInput" placeholder="필터할 단어..." />
          </div> */}
        </SideBarCard>
        <button className="submitBtn" onClick={onSubmit}>
          검색
        </button>
      </form>
    </SideBarWrapper>
  );
}
