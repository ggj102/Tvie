"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { apiClient } from "@/api/httpClient";
import { GlobalContext } from "@/app/context";
import { discoverQuery } from "@/datahandling/discoverQuery";

import { dateFormatter } from "@/utils/dateFormatter";

import ContentLayout from "@/components/contentLayout";
import SideBar from "@/components/sideBar/sideBar";

import CustomImage from "./customImage";

export type GenreDataType = {
  id: number;
  name: string;
  checked?: boolean;
};

export type ReleaseDateType = {
  [index: string]: boolean;
  all_releases: boolean;
  theater_limited: boolean;
  theater: boolean;
  premier: boolean;
  digital: boolean;
  physical_media: boolean;
  tv: boolean;
};

export type AirDateType = {
  [index: string]: boolean;
  all_episodes: true;
  first_air_date: true;
};

export type AvailabilitiesType = {
  [index: string]: boolean;
  all_availabilities: boolean;
  stream: boolean;
  free: boolean;
  ads: boolean;
  rent: boolean;
  buy: boolean;
};

export type DiscoverDataType = {
  sort_by: string;
  availabilities: AvailabilitiesType;
  release: ReleaseDateType | AirDateType;
  release_date_g: Date | null;
  release_date_l: Date | null;
  genre: GenreDataType[];
  vote_average: number[];
  vote_count: 0;
  runtime: number[];
};

export type ContentDataType = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average?: number;
  vote_count?: number;
};

export default function ContentList({ contentType }: { contentType: string }) {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const currentDate = new Date();
  const addMonthDate = currentDate.setMonth(currentDate.getMonth() + 6);
  const setDate = new Date(addMonthDate);

  const [pageCount, setPageCount] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>(0);
  const [listData, setListData] = useState<ContentDataType[]>([]);
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
        setTotalPage(res.data.total_pages);
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
    setIsLoading(true);
    apiClient.get(`${currentQuery}1`).then((res) => {
      setListData(res.data.results);
      setTotalPage(res.data.total_pages);
      setIsLoading(false);
      window.scrollTo({ top: 0 });
    });
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

  return (
    !isLoading && (
      <ContentLayout>
        <div className="categoryTitle">
          {contentType === "movie" ? "영화" : "TV 프로그램"}
        </div>
        <div className="contentArea">
          <SideBar
            defaultData={defaultDiscoverData}
            onSubmit={onSubmitDiscover}
          />
          <div className="contentList">
            <ul>
              {listData.map((val: ContentDataType) => {
                const { id, poster_path, vote_average } = val;

                const title = contentType === "movie" ? val.title : val.name;
                const date =
                  contentType === "movie"
                    ? val.release_date
                    : val.first_air_date;
                const vote = `${Math.floor(
                  vote_average ? vote_average * 10 : 0
                )}%`;
                const dateFormat = dateFormatter(date);

                return (
                  <li key={id}>
                    <Link href={`/contentDetail?type=${contentType}&id=${id}`}>
                      <CustomImage
                        className="contentImg"
                        type="content"
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
                      />
                    </Link>
                    <div className="score">{vote}</div>
                    <div className="titleRelease">
                      <Link
                        href={`/contentDetail?type=${contentType}&id=${id}`}
                        className="title"
                      >
                        {title}
                      </Link>
                      <div className="release">{dateFormat}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {totalPage > 20 && (
              <button type="button" onClick={onClickAddList}>
                더 불러오기
              </button>
            )}
          </div>
        </div>
      </ContentLayout>
    )
  );
}
