import { personDetailApi } from "@/api/httpClient";

import SideInfo from "./components/sideInfo";
import HistoryInfo from "./components/historyInfo";
import FamousInfo from "./components/famousInfo";
import CareerInfo from "./components/careerInfo";

import personDetailStyles from "@styles/pages/personDetail/personDetail.module.scss";

async function ServerSideProps(id: any) {
  const personDetailData = await personDetailApi(id);

  const personInfoData = personDetailData.koData.data;
  const biography = personDetailData.biography;
  const famous = personDetailData.famous;
  const acting = personDetailData.acting;

  return { personInfoData, biography, famous, acting };
}

export default async function PersonDetailPage({ searchParams }: any) {
  const { personInfoData, biography, famous, acting } = await ServerSideProps(
    searchParams.id
  );

  return (
    <div className={personDetailStyles.person_detail}>
      <SideInfo acting={acting} personInfoData={personInfoData} />
      <div className={personDetailStyles.detail_info}>
        <div className={personDetailStyles.person_name}>
          {personInfoData.name}
        </div>
        <HistoryInfo biography={biography} personInfoData={personInfoData} />
        <FamousInfo famous={famous} />
        <CareerInfo acting={acting} />
      </div>
    </div>
  );
}
