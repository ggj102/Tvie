import CustomImage from "@/components/common/customImage";

import sideInfoStyles from "@styles/pages/personDetail/sideInfo.module.scss";

export default function SideInfo({ gender, acting, personDetailData }: any) {
  const yearsCalc = (birth: string) => {
    if (!birth) return;

    const date = new Date();
    const extractedStr = birth.substring(0, 4);

    return ` (${date.getFullYear() - Number(extractedStr)} years old)`;
  };

  return (
    <div className={sideInfoStyles.side_info}>
      <CustomImage
        className={sideInfoStyles.person_image}
        type="person"
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${personDetailData.profile_path}`}
      />
      <div className={sideInfoStyles.info}>
        <div>인물 정보</div>
        <div className={sideInfoStyles.intro}>
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
  );
}
