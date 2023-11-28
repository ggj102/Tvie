import CustomImage from "@/components/customImage";

import sideInfoStyles from "@styles/pages/personDetail/sideInfo.module.scss";

export default function SideInfo({
  acting,
  personInfoData,
}: {
  acting: PersonDetailDataType[];
  personInfoData: personInfoType;
}) {
  const gender = ["-", "여성", "남성"];

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
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${personInfoData.profile_path}`}
      />
      <div className={sideInfoStyles.info}>
        <div>인물 정보</div>
        <div className={sideInfoStyles.intro}>
          <div>
            <p>유명 분야</p>
            <div>{personInfoData.known_for_department}</div>
          </div>
          <div>
            <p>참여 작품 수</p>
            <div>{acting.length}</div>
          </div>
          <div>
            <p>성별</p>
            <div>{gender[personInfoData.gender]}</div>
          </div>
          <div>
            <p>생일</p>
            <div>
              {personInfoData.birthday || "-"}
              {!personInfoData.deathday
                ? yearsCalc(personInfoData.birthday)
                : ""}
            </div>
          </div>
          {personInfoData.deathday && (
            <div>
              <p>사망일</p>
              <div>
                {personInfoData.deathday}
                {yearsCalc(personInfoData.birthday)}
              </div>
            </div>
          )}
          <div>
            <p>출생지</p>
            <div>{personInfoData.place_of_birth || "-"}</div>
          </div>
          <div>
            <p>다른 명칭</p>
            <ul>
              {personInfoData.also_known_as.length > 0
                ? personInfoData.also_known_as.map((val: string) => {
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
