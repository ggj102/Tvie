"use client";

import Link from "next/link";

import { dateFormatter } from "@/utils/dateFormatter";

import useHistoryList from "./useHistoryList";

import CustomImage from "@/components/customImage";
import VoteAverage from "@/components/voteAverage";
import FavoritesButton from "@/components/favoritesButton";
import Loading from "@/components/loading";

import historyStyles from "@styles/pages/history/history.module.scss";

export default function HistoryList({ isSession }: { isSession: boolean }) {
  const { isLoading, listData, onClickEmptyList } = useHistoryList();

  return isLoading ? (
    <Loading />
  ) : (
    <div className={historyStyles.history_list}>
      {listData.length > 0 ? (
        <>
          <div className={historyStyles.empty_button}>
            <button onClick={onClickEmptyList}>목록 비우기</button>
          </div>
          <ul>
            {listData.map((val: any) => {
              const { type, id, vote_average, isFavorites } = val;

              const title = val.title || val.name;
              const imagePath = val.profile_path || val.poster_path;
              const imageSize =
                type === "person" ? "w235_and_h235" : "w220_and_h330";
              const date = val.release_date || val.first_air_date;
              const dateFormat = dateFormatter(date);
              const link =
                type === "person"
                  ? `personDetail?id=${id}`
                  : `contentsDetail?type=${type}&id=${id}`;

              return (
                <li key={id}>
                  <Link href={`/${link}`}>
                    <CustomImage
                      className={historyStyles.image}
                      type={type}
                      src={`https://image.tmdb.org/t/p/${imageSize}_face/${imagePath}`}
                    />
                  </Link>
                  {isSession ? (
                    <div className={historyStyles.favorites_area}>
                      <FavoritesButton
                        isFavorites={isFavorites}
                        id={id}
                        type={type}
                        size={24}
                      />
                    </div>
                  ) : (
                    <div className={historyStyles.empty_box}></div>
                  )}

                  {type === "person" ? (
                    <div className={historyStyles.person_info}>
                      <Link
                        href={`/personDetail?id=${id}`}
                        className={historyStyles.person_name}
                      >
                        {title}
                      </Link>
                    </div>
                  ) : (
                    <>
                      <VoteAverage
                        size={34}
                        top={256}
                        left={8}
                        vote={vote_average}
                      />
                      <div className={historyStyles.title_release}>
                        <Link href={`/${link}`} className={historyStyles.title}>
                          {title}
                        </Link>
                        <div className={historyStyles.release}>
                          {dateFormat}
                        </div>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className={historyStyles.empty_text}>
          최근에 본 컨텐츠 및 인물이 없습니다.
        </div>
      )}
    </div>
  );
}
