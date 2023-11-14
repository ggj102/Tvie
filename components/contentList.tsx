"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { apiClient } from "@/api/httpClient";
import { dateFormatter } from "@/utils/dateFormatter";

import ContentLayout from "@/components/contentLayout";
import SideBar from "@/components/sideBar/sideBar";
import { discoverQuery } from "@/datahandling/discoverQuery";

export default function ContentList({ contentType }: any) {
  const currentDate = new Date();
  const addMonthDate = currentDate.setMonth(currentDate.getMonth() + 6);
  const setDate = new Date(addMonthDate);

  const [pageCount, setPageCount] = useState<number>(1);

  const [totalPage, setTotalPage] = useState<number>(0);
  const [listData, setListData] = useState<any>([]);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [currentQuery, setCurrentQuery] = useState<string>(
    `${contentType}/popular?language=ko&page=`
  );

  const [isScrollEvent, setIsScrollEvent] = useState<boolean>(false);

  const release =
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
          release_date_g: "",
          release_date_l: setDate,
        }
      : {
          all_episodes: true,
          first_air_date: true,
          release_date_g: "",
          release_date_l: setDate,
        };

  const [defaultDiscoverData, setDefaultDiscoverData] = useState<any>({
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
    genre: [],
    vote_average: [0, 10],
    vote_count: 0,
    runtime: [0, 400],
  });

  const onSubmitDiscover = (data: any) => {
    if (data.type === "click") return;
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
    apiClient.get(`${currentQuery}1`).then((res) => {
      setListData(res.data.results);
      setTotalPage(res.data.total_pages);

      window.scrollTo({ top: 0 });
    });
  }, []);

  useEffect(() => {
    const onScrollAddList = (e: any) => {
      const { scrollHeight, clientHeight, scrollTop } =
        e.target.documentElement;
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
            {listData.map((val: any) => {
              const { id, poster_path, vote_average } = val;

              const title = contentType === "movie" ? val.title : val.name;
              const date =
                contentType === "movie" ? val.release_date : val.first_air_date;
              const vote = `${Math.floor(vote_average * 10)}%`;
              const dateFormat = dateFormatter(date);

              return (
                <li key={id}>
                  <Link href={`/contentDetail?type=${contentType}&id=${id}`}>
                    <div className="contentImg">
                      <Image
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
                        fill
                        sizes="1x"
                        alt="contentImg"
                      />
                    </div>
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
  );
}
