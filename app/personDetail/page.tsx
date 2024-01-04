import { personDetailApi } from "@/lib/api/httpClient";
import { getManagementUser } from "@/lib/api/authZero";

import SideInfo from "./components/sideInfo";
import HistoryInfo from "./components/historyInfo";
import FamousInfo from "./components/famousInfo";
import CareerInfo from "./components/careerInfo";

import personDetailStyles from "@styles/pages/personDetail/personDetail.module.scss";
import FavoritesButton from "@/components/favoritesButton";

async function ServerSideProps(id: any) {
  const personDetailData = await personDetailApi(id);
  const userData = await getManagementUser();
  const isSession = !!userData;
  let isFavorites = false;

  if (userData?.user_metadata.favorites) {
    const { favorites } = userData?.user_metadata;
    isFavorites = favorites.person.includes(`${id}`);
  }

  const personInfoData = personDetailData.koData.data;
  const biography = personDetailData.biography;
  const famous = personDetailData.famous;
  const acting = personDetailData.acting;

  return { isSession, isFavorites, personInfoData, biography, famous, acting };
}

export default async function PersonDetailPage({ searchParams }: any) {
  const { isSession, isFavorites, personInfoData, biography, famous, acting } =
    await ServerSideProps(searchParams.id);

  return (
    <div className={personDetailStyles.person_detail}>
      <SideInfo acting={acting} personInfoData={personInfoData} />
      <div className={personDetailStyles.detail_info}>
        <div className={personDetailStyles.person_name_bar}>
          <div className={personDetailStyles.person_name}>
            {personInfoData.name}
          </div>
          {isSession && (
            <FavoritesButton
              isFavorites={isFavorites}
              id={searchParams.id}
              type="person"
              size={50}
            />
          )}
        </div>

        <HistoryInfo biography={biography} personInfoData={personInfoData} />
        <FamousInfo famous={famous} />
        <CareerInfo acting={acting} />
      </div>
    </div>
  );
}
