"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { PersonDetailWrapper } from "@/styles/pages/personDetailWrapper";
import { personDetailApi } from "@/api/httpClient";
import Link from "next/link";

export default function PersonDetailPage() {
  const [personDetailData, setPersonDetailData] = useState<any>({
    profile_path: "",
    also_known_as: [],
    birthday: "",
  });
  const [biography, setBiography] = useState<any>([]);
  const [famous, setFamous] = useState<any>([]);
  const [acting, setActing] = useState<any>([]);

  const params = useSearchParams();
  const gender = ["-", "여성", "남성"];
  const yearsCalc = (birth: string) => {
    if (!birth) return;

    const date = new Date();
    const extractedStr = birth.substring(0, 4);

    return ` (${date.getFullYear() - Number(extractedStr)} years old)`;
  };

  useEffect(() => {
    const personId = params.get("id");

    personDetailApi(personId).then((res: any) => {
      setPersonDetailData(res.koData.data);
      setBiography(res.biography);
      setFamous(res.famous);
      setActing(res.acting);
    });
  }, []);

  return (
    <PersonDetailWrapper>
      <div>
        <div className="personInfo">
          <div className="personImg">
            <Image
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${personDetailData.profile_path}`}
              fill
              sizes="1x"
              alt="personImg"
            />
          </div>
          <div className="info">
            <div>인물 정보</div>
            <div className="intro">
              <div>
                <p>유명 분야</p>
                <div>{personDetailData.known_for_department}</div>
              </div>
              <div>
                <p>참여 작품 수</p>
                <div>{acting.length}</div>
              </div>
              <div>
                <p>성별</p>
                <div>{gender[personDetailData.gender]}</div>
              </div>
              <div>
                <p>생일</p>
                <div>
                  {personDetailData.birthday || "-"}
                  {!personDetailData.deathday
                    ? yearsCalc(personDetailData.birthday)
                    : ""}
                </div>
              </div>
              {personDetailData.deathday && (
                <div>
                  <p>사망일</p>
                  <div>
                    {personDetailData.deathday}
                    {yearsCalc(personDetailData.birthday)}
                  </div>
                </div>
              )}
              <div>
                <p>출생지</p>
                <div>{personDetailData.place_of_birth || "-"}</div>
              </div>
              <div>
                <p>다른 명칭</p>
                <ul>
                  {personDetailData.also_known_as.length > 0
                    ? personDetailData.also_known_as.map((val: string) => {
                        return <li key={val}>{val}</li>;
                      })
                    : "-"}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="detailInfo">
          <div className="personName">{personDetailData.name}</div>
          <div className="history">
            <div className="detailInfoTitle">약력</div>
            <div className="historyText">
              {biography.length > 0
                ? biography.map((val: string, idx: number) => {
                    return <div key={`${biography}${idx}`}>{val}</div>;
                  })
                : `${personDetailData.name}의 약력 란이 비어있습니다.`}
            </div>
          </div>
          <div className="famous">
            <div className="detailInfoTitle">유명 작품</div>
            <div className="famousList">
              <ul>
                {famous.map((val: any, idx: number) => {
                  const { id, media_type } = val;
                  const title = val.title || val.name;
                  return (
                    <li key={id}>
                      <Link href={`/contentDetail?type=${media_type}&id=${id}`}>
                        <div className="famousImg">
                          <Image
                            src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${val.poster_path}`}
                            fill
                            sizes="1x"
                            alt="famousImg"
                          />
                        </div>
                      </Link>
                      <div className="famousTitle">
                        <Link
                          href={`/contentDetail?type=${media_type}&id=${id}`}
                        >
                          {title}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="career">
            <div className="detailInfoTitle">연기</div>
            <ul className="careerList">
              {acting.map((val: any) => {
                const { id, media_type } = val;
                const title = val.title || val.name;
                const date: string = val.first_air_date || val.release_date;
                const year = date ? date.substring(0, 4) : "—";

                return (
                  <li key={id} className={val.topLine ? "topLine" : ""}>
                    <div className="careerYear">{year}</div>
                    <div className="dot">
                      <div></div>
                    </div>
                    <div className="casting">
                      <div>
                        <Link
                          href={`/contentDetail?type=${media_type}&id=${id}`}
                        >
                          {title}
                        </Link>
                      </div>
                      <div className="castingInfo">
                        {val.episode_count && (
                          <div className="episode">
                            ({val.episode_count} 화)
                          </div>
                        )}
                        {val.character && (
                          <div className="character">{val.character} 역</div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </PersonDetailWrapper>
  );
}
