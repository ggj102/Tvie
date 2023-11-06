"use client";

import { useEffect, useState } from "react";
import ContentLayout from "@/components/contentLayout";
import SideBar from "@/components/sideBar/sideBar";
import Link from "next/link";
import Image from "next/image";

export default function MoviePage() {
  const [dummyData, setDummyData] = useState<any>([]);

  useEffect(() => {
    const dummy = {
      title: "프레디의 피자가게",
      release: "10월 27, 2023",
      image: "/images/testContentImg.jpg",
      score: "84%",
    };

    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(dummy);
    }

    setDummyData(arr);
  }, []);

  return (
    <ContentLayout>
      <div className="categoryTitle">인기 영화</div>
      <div className="contentArea">
        <SideBar />
        <div className="contentList">
          <ul>
            {dummyData.map((val: any, idx: number) => {
              const { title, release, image, score } = val;

              return (
                <li key={`${title}${idx}`}>
                  <Link href="">
                    <div className="contentImg">
                      <Image src={image} fill alt="contentImg" />
                    </div>
                    <div className="score">{score}</div>
                    <div className="titleRelease">
                      <div className="title">{title}</div>
                      <div className="release">{release}</div>
                    </div>
                  </Link>
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
