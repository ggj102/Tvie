"use client";

import personDetailStyles from "@styles/pages/personDetail/personDetail.module.scss";
import historyStyles from "@styles/pages/personDetail/historyInfo.module.scss";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useHistoryInfo from "./useHistoryInfo";

export default function HistoryInfo({
  biography,
  personInfoData,
}: {
  biography: string[];
  personInfoData: personInfoType;
}) {
  const { maxHeight, textRef, isOpenBtn, isOpenHistory, onClickTextOpen } =
    useHistoryInfo();

  return (
    <div>
      <div className={personDetailStyles.info_title}>약력</div>
      <div className={historyStyles.history}>
        <div
          className={historyStyles.history_text}
          style={{ "--max_height": `${maxHeight}px` } as React.CSSProperties}
        >
          <div ref={textRef} className={historyStyles.innerText}>
            {biography.length > 0
              ? biography.map((val: string, idx: number) => {
                  return <div key={`${biography}${idx}`}>{val}</div>;
                })
              : `${personInfoData.name}의 약력 란이 비어있습니다.`}
          </div>
        </div>
        {isOpenBtn && (
          <div
            className={`${historyStyles.text_btn} ${
              isOpenHistory
                ? historyStyles.open_text_btn
                : historyStyles.close_text_btn
            }`}
          >
            <button onClick={onClickTextOpen}>
              <ArrowDropUpIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
