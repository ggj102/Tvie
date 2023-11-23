import historyStyles from "@styles/pages/personDetail/history.module.scss";

export default function History({
  biography,
  personInfoData,
}: {
  biography: string[];
  personInfoData: personInfoType;
}) {
  return (
    <div className={historyStyles.history}>
      <div className={historyStyles.history_text}>
        {biography.length > 0
          ? biography.map((val: string, idx: number) => {
              return <div key={`${biography}${idx}`}>{val}</div>;
            })
          : `${personInfoData.name}의 약력 란이 비어있습니다.`}
      </div>
    </div>
  );
}
