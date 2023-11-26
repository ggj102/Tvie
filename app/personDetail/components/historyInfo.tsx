import personDetailStyles from "@styles/pages/personDetail/personDetail.module.scss";
import historyStyles from "@styles/pages/personDetail/historyInfo.module.scss";

export default function HistoryInfo({
  biography,
  personInfoData,
}: {
  biography: string[];
  personInfoData: personInfoType;
}) {
  return (
    <div>
      <div className={personDetailStyles.info_title}>약력</div>
      <div className={historyStyles.history}>
        <div className={historyStyles.history_text}>
          {biography.length > 0
            ? biography.map((val: string, idx: number) => {
                return <div key={`${biography}${idx}`}>{val}</div>;
              })
            : `${personInfoData.name}의 약력 란이 비어있습니다.`}
        </div>
      </div>
    </div>
  );
}
