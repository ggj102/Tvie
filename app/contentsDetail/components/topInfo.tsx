import Link from "next/link";

import CustomImage from "@/components/customImage";

import topInfoStyles from "@styles/pages/contentsDetail/topInfo.module.scss";
import VoteAverage from "@/components/voteAverage";
import FavoritesButton from "@/components/favoritesButton";

export default function TopInfo({
  isSession,
  isFavorites,
  isTypeTV,
  id,
  data,
  date,
}: {
  isSession: boolean;
  isFavorites: boolean;
  isTypeTV: boolean;
  id: any;
  data: any;
  date: {
    year: string;
    month: string;
    day: string;
  };
}) {
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
        backgroundImage: `url(${bgDefaultUrl}${data.backdrop_path})`,
      }}
    >
      <div>
        <div>
          <div className={topInfoStyles.poster}>
            <CustomImage
              className={topInfoStyles.poster_image}
              type="content"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`}
            />
            {/* <div className="ottOffer"></div> */}
          </div>
          <div className={topInfoStyles.info}>
            <div className={topInfoStyles.title_wrapper}>
              <div className={topInfoStyles.title}>
                <span>{data.title}</span> <span>({date.year})</span>
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
                  {data.genres &&
                    data.genres.map(
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
                    {runtimeFormatter(data.runtime)}
                  </span>
                )}
              </div>
            </div>
            <div className={topInfoStyles.user_action}>
              <div className={topInfoStyles.vote_average}>
                <VoteAverage
                  size={60}
                  font={20}
                  top={0}
                  left={0}
                  vote={data.vote_average}
                />
                <div>
                  회원
                  <br />
                  점수
                </div>
              </div>
              {isSession && (
                <>
                  <div className={topInfoStyles.favorites_area}>
                    <FavoritesButton
                      isFavorites={isFavorites}
                      id={id}
                      type={isTypeTV ? "tv" : "movie"}
                      size={24}
                    />
                  </div>
                </>
              )}

              {/* <button className={topInfoStyles.trail_btn}>
                <div className={topInfoStyles.arrow}></div>
                <div>트레일러 재생</div>
              </button> */}
            </div>
            <div className={topInfoStyles.summary}>
              <div className={topInfoStyles.tagline}>{data.tagline}</div>
              <div>개요</div>
              <div>{data.overview}</div>
            </div>
            <div className={topInfoStyles.producer}>
              <ul>
                {isTypeTV &&
                  data.created_by.map((val: CreatedByType, idx: number) => {
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
