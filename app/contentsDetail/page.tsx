import { contentsDetailApi } from "@/lib/api/httpClient";
import { getManagementUser } from "@/lib/api/authZero";

import ContentsDetail from "./components/contentsDetail";
import TopInfo from "@/app/contentsDetail/components/topInfo";
import MainCast from "@/app/contentsDetail/components/mainCast";
import SideInfo from "@/app/contentsDetail/components/sideInfo";

import contentsDetailStyles from "@styles/pages/contentsDetail/contentsDetail.module.scss";

async function ServerSideProps(searchParams: any) {
  const { id, type } = searchParams;

  const userData = await getManagementUser();
  const isSession = !!userData;
  let isFavorites = false;

  if (userData?.user_metadata.favorites) {
    const { favorites } = userData?.user_metadata;
    isFavorites = favorites[type].includes(`${id}`);
  }

  const isTypeTV = type === "tv";

  const contentsDetailData = await contentsDetailApi(id, type);
  const [contents, credits, keywords] = contentsDetailData;

  const title = contents.data.name || contents.data.title;
  const original_title =
    contents.data.original_name || contents.data.original_title;

  const detailData = { ...contents.data, title, original_title };

  const castData = credits.data.cast.slice(0, 9);
  const keywordData = keywords.data.keywords || keywords.data.results;

  const contentDate =
    contents.data.first_air_date || contents.data.release_date;
  const dateSplit = contentDate.split("-");
  const date = {
    year: dateSplit[0],
    month: dateSplit[1],
    day: dateSplit[2],
  };

  return {
    isSession,
    isFavorites,
    isTypeTV,
    detailData,
    castData,
    keywordData,
    date,
  };
}

export default async function ContentsDetailPage({ searchParams }: any) {
  const {
    isSession,
    isFavorites,
    isTypeTV,
    detailData,
    castData,
    keywordData,
    date,
  } = await ServerSideProps(searchParams);

  return (
    <ContentsDetail>
      <TopInfo
        isSession={isSession}
        isFavorites={isFavorites}
        isTypeTV={isTypeTV}
        id={searchParams.id}
        data={detailData}
        date={date}
      />
      <div className={contentsDetailStyles.detail_info}>
        <MainCast isTypeTV={isTypeTV} castData={castData} />
        <SideInfo
          isTypeTV={isTypeTV}
          data={detailData}
          keywordData={keywordData}
        />
      </div>
    </ContentsDetail>
  );
}
