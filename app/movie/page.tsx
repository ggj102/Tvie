"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ContentLayout from "@/components/contentLayout";
import SideBar from "@/components/sideBar/sideBar";

import { apiClient } from "@/api/httpClient";
import { dateFormatter } from "@/utils/dateFormatter";
import { discoverQuery } from "@/datahandling/discoverQuery";

export default function MoviePage() {
  const currentDate = new Date();
  const addMonthDate = currentDate.setMonth(currentDate.getMonth() + 6);
  const setDate = new Date(addMonthDate);

  const [listData, setListData] = useState<any>([]);
  const defaultDiscoverData = {
    sort_by: "popularity.desc",
    availabilities: {
      all_availabilities: true,
      stream: true,
      free: true,
      ads: true,
      rent: true,
      buy: true,
    },
    release: {
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
    },
    genre: [],
    vote_average: [0, 10],
    vote_count: 0,
    runtime: [0, 400],
  };

  const onSubmitDiscover = (data: any) => {
    if (data.type === "click") return;
    const query = discoverQuery("movie", data);

    apiClient
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1${query}`
      )
      .then((res) => {
        setListData(res.data.results);
      });
  };

  useEffect(() => {
    apiClient.get("movie/popular?language=ko&page=1").then((res) => {
      setListData(res.data.results);
    });
  }, []);

  return (
    <ContentLayout>
      <div className="categoryTitle">인기 영화</div>
      <div className="contentArea">
        <SideBar
          defaultData={defaultDiscoverData}
          onSubmit={onSubmitDiscover}
        />
        <div className="contentList">
          <ul>
            {listData.map((val: any, idx: number) => {
              const { id, title, release_date, poster_path, vote_average } =
                val;
              const vote = `${Math.floor(vote_average * 10)}%`;
              const date = dateFormatter(release_date);

              return (
                <li key={`${title}${idx}`}>
                  <Link href={`/contentDetail?type=movie&id=${id}`}>
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
                      href={`/contentDetail?type=movie&id=${id}`}
                      className="title"
                    >
                      {title}
                    </Link>
                    <div className="release">{date}</div>
                  </div>
                </li>
              );
            })}
          </ul>
          <button>더 불러오기</button>
        </div>
      </div>
    </ContentLayout>
  );
}
