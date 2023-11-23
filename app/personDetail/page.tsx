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

export default function PersonDetailPage() {
  const params = useSearchParams();
  const { isLoading, setIsLoading } = useContext(GlobalContext);

  const [biography, setBiography] = useState<string[]>([]);
  const [famousData, setFamousData] = useState<PersonDetailDataType[]>([]);
  const [acting, setActing] = useState<PersonDetailDataType[]>([]);
  const [personInfoData, setPersonInfoData] = useState<personInfoType>({
    adult: false,
    also_known_as: [],
    biography: "",
    birthday: "",
    combined_credits: { cast: [], crew: [] },
    deathday: null,
    gender: 0,
    homepage: null,
    id: 0,
    imdb_id: "",
    known_for_department: "",
    name: "",
    place_of_birth: "",
    popularity: 230.142,
    profile_path: "",
  });

  useEffect(() => {
    const personId = params.get("id");
    setIsLoading(true);
    personDetailApi(personId).then((res) => {
      setPersonInfoData(res.koData.data);
      setBiography(res.biography);
      setFamousData(res.famous);
      setActing(res.acting);
      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <div className={personDetailStyles.person_detail}>
        <SideInfo acting={acting} personInfoData={personInfoData} />
        <div className={personDetailStyles.detail_info}>
          <div className={personDetailStyles.person_name}>
            {personInfoData.name}
          </div>
          <div>
            <div className={personDetailStyles.info_title}>약력</div>
            <History biography={biography} personInfoData={personInfoData} />
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
