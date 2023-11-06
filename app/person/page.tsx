"use client";

import { useEffect, useState } from "react";
import ContentLayout from "@/components/contentLayout";
import Image from "next/image";

export default function PersonPage() {
  const [dummyData, setDummyData] = useState<any>([]);

  useEffect(() => {
    const dummy = {
      name: "Tom Holland",
      sub: " 스파이더맨: 홈커밍, 스파이더맨: 노 웨이 홈, and 스파이더맨: 파 프롬 홈",
      image: "/images/testContentImg3.jpg",
    };

    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(dummy);
    }

    setDummyData(arr);
  }, []);

  return (
    <ContentLayout>
      <div className="categoryTitle">인기 인물</div>
      <div className="personList">
        {dummyData.map((val: any, idx: number) => {
          const { name, sub, image } = val;
          return (
            <div key={`${val}${idx}`} className="personCard">
              <div className="personImg">
                <Image src={image} fill alt="personImg" />
              </div>
              <div className="personInfo">
                <div className="name">{name}</div>
                <div className="sub">{sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        <div>페이지네이션</div>
      </div>
    </ContentLayout>
  );
}
