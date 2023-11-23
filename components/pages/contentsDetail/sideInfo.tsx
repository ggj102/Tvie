import sideInfoStyles from "@styles/pages/contentsDetail/sideInfo.module.scss";
import { useEffect, useState } from "react";

export default function SideInfo({
  isTypeTV,
  movieInfolData,
  tvInfolData,
  keywordData,
}: {
  isTypeTV: boolean;
  movieInfolData: MovieInfoType;
  tvInfolData: TVShowInfoType;
  keywordData: KeywordType[];
}) {
  const [contentsData, setContentsData] = useState<
    MovieInfoType | TVShowInfoType
  >(movieInfolData || tvInfolData);

  const dollarFormatter = (dollar: number) => {
    const strDollar = `${dollar}`;
    const arr = [];
    for (let i = strDollar.length - 1; i >= 0; i--) {
      arr.unshift(`${strDollar[i]}`);
      if (i % 3 === 0 && i !== 0) arr.unshift(",");
    }

    const format = arr.join("");

    return `$${format}.00`;
  };

  useEffect(() => {
    if (isTypeTV) setContentsData(tvInfolData);
    else setContentsData(movieInfolData);
  }, [movieInfolData, tvInfolData]);

  return (
    <div className={sideInfoStyles.side_info}>
      <div>
        <strong>원제</strong>
        <div>{tvInfolData.original_name || movieInfolData.original_title}</div>
      </div>
      <div>
        <strong>상태</strong>
        <div>{contentsData.status}</div>
      </div>
      <div>
        <strong>원어</strong>
        <div>{contentsData.original_language}</div>
      </div>
      {!isTypeTV && (
        <>
          <div>
            <strong>제작비</strong>
            <div>{dollarFormatter(movieInfolData.budget)}</div>
          </div>
          <div>
            <strong>수익</strong>
            <div>{dollarFormatter(movieInfolData.revenue)}</div>
          </div>
        </>
      )}

      <div>
        <h4>키워드</h4>
        <ul>
          {keywordData.map((val: KeywordType, idx: number) => {
            return (
              <li key={`${val.name}${idx}`}>
                {/* <Link href="">{val.name}</Link> */}
                {val.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
