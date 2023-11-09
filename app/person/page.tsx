"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { apiClient } from "@/api/httpClient";
import ContentLayout from "@/components/contentLayout";

export default function PersonPage() {
  const [personData, setPersonData] = useState<any>([]);

  useEffect(() => {
    apiClient.get("person/popular?language=ko&page=1").then((res) => {
      setPersonData(res.data.results);
    });
  }, []);

  return (
    <ContentLayout>
      <div className="categoryTitle">인기 인물</div>
      <div className="personList">
        {personData.map((val: any) => {
          const { id, name, known_for, profile_path } = val;
          return (
            <div key={id} className="personCard">
              <Link href={`/personDetail?id=${id}`}>
                <div className="personImg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w235_and_h235_face/${profile_path}`}
                    fill
                    sizes="1x"
                    alt="personImg"
                  />
                </div>
              </Link>
              <div className="personInfo">
                <Link href={`/personDetail?id=${id}`} className="name">
                  {name}
                </Link>
                <div className="sub">
                  {known_for.map((val: any, idx: number, arr: any) => {
                    const title = val.title || val.name;

                    return `${title}${idx !== arr.length - 1 ? ", " : ""}`;
                  })}
                </div>
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
