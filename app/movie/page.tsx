"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ContentLayout from "@/components/contentLayout";
import SideBar from "@/components/sideBar/sideBar";

import { apiClient } from "@/api/httpClient";
import { dateFormater } from "@/utils/dateFormater";

export default function MoviePage() {
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    apiClient.get("movie/popular?language=ko&page=1").then((res) => {
      setListData(res.data.results);
    });
  }, []);

  return (
    <ContentLayout>
      <div className="categoryTitle">인기 영화</div>
      <div className="contentArea">
        <SideBar />
        <div className="contentList">
          <ul>
            {listData.map((val: any, idx: number) => {
              const { id, title, release_date, poster_path, vote_average } =
                val;
              const vote = `${Math.floor(vote_average * 10)}%`;
              const date = dateFormater(release_date);

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
