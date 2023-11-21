import sideInfoStyles from "@styles/pages/contentsDetail/sideInfo.module.scss";

export default function SideInfo({ isTypeTV, detailData, keywordData }: any) {
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

  return (
    <div className={sideInfoStyles.side_info}>
      <div>
        <strong>원제</strong>
        <div>
          {isTypeTV ? detailData.original_name : detailData.original_title}
        </div>
      </div>
      <div>
        <strong>상태</strong>
        <div>{detailData.status}</div>
      </div>
      <div>
        <strong>원어</strong>
        <div>{detailData.original_language}</div>
      </div>
      {!isTypeTV && (
        <>
          <div>
            <strong>제작비</strong>
            <div>{dollarFormatter(detailData.budget)}</div>
          </div>
          <div>
            <strong>수익</strong>
            <div>{dollarFormatter(detailData.revenue)}</div>
          </div>
        </>
      )}

      <div>
        <h4>키워드</h4>
        <ul>
          {isTypeTV
            ? keywordData.results.map((val: any, idx: number) => {
                return (
                  <li key={`${val.name}${idx}`}>
                    {/* <Link href="">{val.name}</Link> */}
                    {val.name}
                  </li>
                );
              })
            : keywordData.keywords.map((val: any, idx: number) => {
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
