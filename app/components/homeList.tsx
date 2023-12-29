import { RefObject } from "react";
import Link from "next/link";

import { dateFormatter } from "@/utils/dateFormatter";

import CustomImage from "@/components/customImage";
import VoteAverage from "@/components/voteAverage";
import FavoritesButton from "@/components/favoritesButton";

import homeListStyles from "@styles/pages/home/homeList.module.scss";

export default function HomeList({
  isSession,
  listData,
  listRef,
}: {
  isSession: boolean;
  listData: ContentsDataType[];
  listRef: RefObject<HTMLUListElement>;
}) {
  return (
    <ul ref={listRef} className={homeListStyles.home_list}>
      {listData.map((val: ContentsDataType) => {
        const { id, poster_path, vote_average, isFavorites } = val;

        const date = val.first_air_date || val.release_date;
        const type = val.hasOwnProperty("title") ? "movie" : "tv";

        return (
          <li key={id}>
            <Link href={`/contentsDetail?type=${type}&id=${id}`}>
              <CustomImage
                className={homeListStyles.image}
                type="content"
                src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
              />
            </Link>
            <VoteAverage size={34} top={208} left={8} vote={vote_average} />
            {isSession && (
              <div className={homeListStyles.favorites_area}>
                <FavoritesButton
                  isFavorites={isFavorites}
                  id={id}
                  type={type}
                  size={24}
                />
              </div>
            )}
            <div className={homeListStyles.title_release}>
              <Link
                className={homeListStyles.title}
                href={`/contentsDetail?type=${type}&id=${id}`}
              >
                <div>{val.name || val.title}</div>
              </Link>
              <div className={homeListStyles.release}>
                {dateFormatter(date)}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
