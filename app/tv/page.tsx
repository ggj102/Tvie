"use client";

import { useEffect, useState } from "react";
import ContentLayout from "@/components/contentLayout";
import SideBar from "@/components/sideBar/sideBar";
import Link from "next/link";
import Image from "next/image";

export default function TVPage() {
  const [dummyData, setDummyData] = useState<any>([]);

  useEffect(() => {
    const dummy = {
      title: "로키",
      release: "6월 09, 2021",
      image: "/images/testContentImg2.jpg",
      score: "82%",
    };

    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(dummy);
    }

    setDummyData(arr);
  }, []);

  return (
    <ContentLayout>
      <div className="categoryTitle">인기 TV 프로그램</div>
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
