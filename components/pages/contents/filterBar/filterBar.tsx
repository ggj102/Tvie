"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import FilterBarCard from "./filterBarCard";
import Availabilities from "./filterBarItems/availabilities";
import ReleaseDates from "./filterBarItems/releaseDates";
import Genre from "./filterBarItems/genre";

import filterBarStyles from "@styles/pages/contents/filterBar/filterBar.module.scss";
import Sort from "./filterBarItems/sort";
import SliderFilter from "./filterBarItems/sliderFilter";

export default function FilterBar({
  contentType,
  defaultData,
  onSubmit,
}: {
  contentType: string;
  defaultData: DiscoverDataType;
  onSubmit: (data: DiscoverDataType, isDirty: boolean) => void;
}) {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<DiscoverDataType>({
    defaultValues: { ...defaultData },
  });

  useEffect(() => {
    reset(defaultData);
  }, [defaultData, reset]);

  return (
    <form
      className={filterBarStyles.filter_bar}
      onSubmit={handleSubmit((data) => onSubmit(data, isDirty))}
    >
      <FilterBarCard title="정렬" defaultOpen={true}>
        <Sort control={control} />
      </FilterBarCard>
      {/* <FilterBarCard title="Where To Watch" defaultOpen={true}>
          <div className="cardContent">
            <div>Country</div>
            <select>
              <option>대한민국</option>
            </select>
            <div></div>
          </div>
        </FilterBarCard> */}
      <FilterBarCard title="필터" defaultOpen={true}>
        <Availabilities control={control} />
        <ReleaseDates control={control} />
        <Genre contentType={contentType} setValue={setValue} />
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
        <SliderFilter control={control} />
        {/* <div className="cardContent">
            <div>키워드 </div>
            <input className="keywordInput" placeholder="필터할 단어..." />
          </div> */}
      </FilterBarCard>
      <button
        type="submit"
        className={`${filterBarStyles.submit_btn} ${
          isDirty ? filterBarStyles.ready_search : ""
        }`}
      >
        검색
      </button>
    </form>
  );
}
