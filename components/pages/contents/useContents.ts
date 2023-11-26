"use client";

import { apiClient } from "@/api/httpClient";
import { discoverQuery } from "@/datahandling/discoverQuery";
import { useEffect, useState } from "react";

export default function useContents(
  contentType: string,
  list: ContentsDataType[],
  total_Pages: number
) {
  const currentDate = new Date();
  const addMonthDate = currentDate.setMonth(currentDate.getMonth() + 6);
  const setDate = new Date(addMonthDate);

  const [pageCount, setPageCount] = useState<number>(1);

  const [totalPages, setTotalPages] = useState<number>(total_Pages);
  const [listData, setListData] = useState<ContentsDataType[]>(list);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [currentQuery, setCurrentQuery] = useState<string>(
    `${contentType}/popular?language=ko&page=`
  );

  const [isScrollEvent, setIsScrollEvent] = useState<boolean>(false);

  const release: ReleaseDateType | AirDateType =
    contentType === "movie"
      ? {
          all_releases: true,
          // all_countries: true,
          theater_limited: true,
          theater: true,
          premier: true,
          digital: true,
          physical_media: true,
          tv: true,
        }
      : {
          all_episodes: true,
          first_air_date: true,
        };

  const [defaultDiscoverData, setDefaultDiscoverData] =
    useState<DiscoverDataType>({
      sort_by: "popularity.desc",
      availabilities: {
        all_availabilities: true,
        stream: true,
        free: true,
        ads: true,
        rent: true,
        buy: true,
      },
      release,
      release_date_g: null,
      release_date_l: setDate,
      genre: [],
      vote_average: [0, 10],
      vote_count: 0,
      runtime: [0, 400],
    });

  const isEvent = (data: DiscoverDataType | Event): data is Event => {
    return (data as Event).type === "click";
  };

  const onSubmitDiscover = (
    data: DiscoverDataType | Event,
    isDirty: boolean
  ) => {
    if (isEvent(data) || !isDirty) return;
    else {
      setIsScrollEvent(false);

      const includeQuery =
        contentType === "movie"
          ? "include_video=false"
          : "include_null_first_air_dates=false";
      const discoverquery = discoverQuery(contentType, data);
      const query = `discover/${contentType}?include_adult=false&${includeQuery}&language=ko&watch_region=KR${discoverquery}&page=`;

      apiClient.get(`${query}`).then((res) => {
        setCurrentQuery(query);
        setPageCount(1);

        setListData([...res.data.results]);
        setTotalPages(res.data.total_pages);
        setDefaultDiscoverData({ ...data });

        window.scrollTo({ top: 0 });
      });
    }
  };

  const onClickAddList = () => {
    apiClient.get(`${currentQuery}${pageCount + 1}`).then((res) => {
      const copy = [...listData];
      const concat = copy.concat(res.data.results);

      setPageCount(res.data.page);
      setListData(concat);
      setIsScrollEvent(true);
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const onScrollAddList = (e: Event) => {
      const target = e.target as Document;

      const { scrollHeight, clientHeight, scrollTop } = target.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const requestPoint = maxScroll * 0.8;

      if (requestPoint < scrollTop && !isReload) {
        setIsReload(true);
      }
    };

    if (isScrollEvent) {
      window.addEventListener("scroll", onScrollAddList);
    } else window.removeEventListener("scroll", onScrollAddList);

    return () => {
      window.removeEventListener("scroll", onScrollAddList);
    };
  }, [isScrollEvent, isReload]);

  useEffect(() => {
    if (isReload) {
      apiClient.get(`${currentQuery}${pageCount + 1}`).then((res) => {
        const copy = [...listData];
        const concat = copy.concat(res.data.results);

        setPageCount(res.data.page);
        setListData(concat);
        setIsReload(false);
      });
    }
  }, [isReload]);

  return {
    defaultDiscoverData,
    listData,
    totalPages,
    onSubmitDiscover,
    onClickAddList,
  };
}
