import Link from "next/link";

import CustomImage from "@/components/common/customImage";

import topInfoStyles from "@styles/pages/contentsDetail/topInfo.module.scss";
import VoteAverage from "@/components/common/voteAverage";
import { useEffect, useState } from "react";

export default function TopInfo({
  isTypeTV,
  movieInfolData,
  tvInfolData,
  date,
}: {
  isTypeTV: boolean;
  movieInfolData: MovieInfoType;
  tvInfolData: TVShowInfoType;
  date: {
    year: string;
    month: string;
    day: string;
  };
}) {
  const bgDefaultUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

  const [contentsData, setContentsData] = useState<
    MovieInfoType | TVShowInfoType
  >(movieInfolData || tvInfolData);

  const runtimeFormatter = (runtime: number) => {
    if (runtime < 60) return `${runtime}m`;
    if (runtime % 60 === 0) return `${runtime / 60}h`;

    const minute = runtime % 60;
    const hour = (runtime - minute) / 60;

    return `${hour}h ${minute}m`;
  };

  useEffect(() => {
    if (isTypeTV) setContentsData(tvInfolData);
    else setContentsData(movieInfolData);
  }, [movieInfolData, tvInfolData]);

  return (
    <div
      className={topInfoStyles.top_info}
      style={{
        backgroundImage: `url(${bgDefaultUrl}${contentsData.backdrop_path})`,
      }}
    >
      <div>
        <div>
          <div className={topInfoStyles.poster}>
            <CustomImage
              className={topInfoStyles.poster_image}
              type="content"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${contentsData.poster_path}`}
            />
            {/* <div className="ottOffer"></div> */}
          </div>
          <div className={topInfoStyles.info}>
            <div className={topInfoStyles.title_wrapper}>
              <div className={topInfoStyles.title}>
                <span>{tvInfolData.name || movieInfolData.title}</span>{" "}
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
                  {contentsData.genres &&
                    contentsData.genres.map(
                      (
                        val: GenreDataType,
                        idx: number,
                        arr: GenreDataType[]
                      ) => {
                        return (
                          <Link key={`${val.name}${idx}`} href="">
                            {val.name}
                            {idx !== arr.length - 1 ? ", " : ""}
                          </Link>
                        );
                      }
                    )}
                </span>
                {!isTypeTV && (
                  <span className={topInfoStyles.dot}>
                    {runtimeFormatter(movieInfolData.runtime)}
                  </span>
                )}
              </div>
            </div>
            <div className={topInfoStyles.vote_average}>
              <VoteAverage
                size={60}
                font={20}
                top={0}
                left={0}
                vote={contentsData.vote_average}
              />
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
              <div className={topInfoStyles.tagline}>
                {contentsData.tagline}
              </div>
              <div>개요</div>
              <div>{contentsData.overview}</div>
            </div>
            <div className={topInfoStyles.producer}>
              <ul>
                {isTypeTV &&
                  tvInfolData.created_by.map(
                    (val: CreatedByType, idx: number) => {
                      return (
                        <li key={`${val.name}${idx}`}>
                          <div>
                            <Link href="">{val.name}</Link>
                          </div>
                          <div>창작자</div>
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
