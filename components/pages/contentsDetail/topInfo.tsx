import Link from "next/link";

import CustomImage from "@/components/common/customImage";

import topInfoStyles from "@styles/pages/contentsDetail/topInfo.module.scss";

export default function TopInfo({ isTypeTV, detailData, date }: any) {
  const bgDefaultUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

  const runtimeFormatter = (runtime: number) => {
    if (runtime < 60) return `${runtime}m`;
    if (runtime % 60 === 0) return `${runtime / 60}h`;

    const minute = runtime % 60;
    const hour = (runtime - minute) / 60;

    return `${hour}h ${minute}m`;
  };

  return (
    <div
      className={topInfoStyles.top_info}
      style={{
        backgroundImage: `url(${bgDefaultUrl}${detailData.backdrop_path})`,
      }}
    >
      <div>
        <div>
          <div className={topInfoStyles.poster}>
            <CustomImage
              className={topInfoStyles.poster_image}
              type="content"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${detailData.poster_path}`}
            />
            {/* <div className="ottOffer"></div> */}
          </div>
          <div className={topInfoStyles.info}>
            <div className="titleWrapper">
              <div className={topInfoStyles.title}>
                <span>{isTypeTV ? detailData.name : detailData.title}</span>{" "}
                <span>({date.year})</span>
              </div>
              <div>
                {/* <span className={topInfoStyles.age}>12</span> */}
                {!isTypeTV && (
                  <span className={topInfoStyles.release}>
                    <span>{`${date.year}/${date.month}/${date.day}`}</span>{" "}
                    <span>(KR)</span>
                  </span>
                )}
                <span>
                  {detailData.genres.map((val: any, idx: number, arr: any) => {
                    return (
                      <Link key={`${val.name}${idx}`} href="">
                        {val.name}
                        {idx !== arr.length - 1 ? ", " : ""}
                      </Link>
                    );
                  })}
                </span>
                {!isTypeTV && (
                  <span className={topInfoStyles.dot}>
                    {runtimeFormatter(detailData.runtime)}
                  </span>
                )}
              </div>
            </div>
            <div className={topInfoStyles.vote_average}>
              <div className={topInfoStyles.vote_average_gauge}>
                <div>{`${Math.floor(detailData.vote_average * 10)}%`}</div>
              </div>
              <div>
                회원
                <br />
                점수
              </div>
              {/* <div>로그인 컨텐츠</div>
              <button className={topInfoStyles.trail_btn}>
                <div className={topInfoStyles.arrow}></div>
                <div>트레일러 재생</div>
              </button> */}
            </div>
            <div className={topInfoStyles.summary}>
              <div className={topInfoStyles.tagline}>{detailData.tagline}</div>
              <div>개요</div>
              <div>{detailData.overview}</div>
            </div>
            <div className={topInfoStyles.producer}>
              <ul>
                {isTypeTV &&
                  detailData.created_by.map((val: any, idx: number) => {
                    return (
                      <li key={`${val.name}${idx}`}>
                        <div>
                          <Link href="">{val.name}</Link>
                        </div>
                        <div>창작자</div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
