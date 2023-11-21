"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { GlobalContext } from "../context";
import { personDetailApi } from "@/api/httpClient";

import SideInfo from "@/components/pages/personDetail/sideInfo";
import History from "@/components/pages/personDetail/history";
import Famous from "@/components/pages/personDetail/famous";
import Career from "@/components/pages/personDetail/career";

import personDetailStyles from "@styles/pages/personDetail/personDetail.module.scss";

export type PersonDetailDataType = {
  adult: boolean;
  backdrop_path?: string;
  character?: string;
  credit_id?: string;
  episode_count?: number;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  origin_country: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count: number;
};

export default function PersonDetailPage() {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const [personDetailData, setPersonDetailData] = useState<any>({
    profile_path: "",
    also_known_as: [],
    birthday: "",
  });
  const [biography, setBiography] = useState<any>([]);
  const [famousData, setFamousData] = useState<any>([]);
  const [acting, setActing] = useState<any>([]);

  const params = useSearchParams();
  const gender = ["-", "여성", "남성"];

  useEffect(() => {
    const personId = params.get("id");
    setIsLoading(true);
    personDetailApi(personId).then((res: any) => {
      setPersonDetailData(res.koData.data);
      setBiography(res.biography);
      setFamousData(res.famous);
      setActing(res.acting);
      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <div className={personDetailStyles.person_detail}>
        <SideInfo
          gender={gender}
          acting={acting}
          personDetailData={personDetailData}
        />
        <div className={personDetailStyles.detail_info}>
          <div className={personDetailStyles.person_name}>
            {personDetailData.name}
          </div>
          <div>
            <div className={personDetailStyles.info_title}>약력</div>
            <History
              biography={biography}
              personDetailData={personDetailData}
            />
          </div>
          <div>
            <div className={personDetailStyles.info_title}>유명 작품</div>
            <Famous famousData={famousData} />
          </div>
          <div>
            <div className={personDetailStyles.info_title}>연기</div>
            <Career acting={acting} />
          </div>
        </div>
      </div>
    )
  );
}
