"use client";

import Link from "next/link";

import { dateFormatter } from "@/utils/dateFormatter";

import CustomImage from "@/components/customImage";
import VoteAverage from "@/components/voteAverage";

import favoritesStyle from "@styles/pages/favorites/favorites.module.scss";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import useFavoritesList from "./useFavoritesList";

export default function FavoritesList({
  type,
  listData,
}: {
  type: string;
  listData: any;
}) {
  const { list, titleConnectObj, onClickDelete } = useFavoritesList(listData);

  return (
    <div className={favoritesStyle.favorites_list}>
      <div>{titleConnectObj[type]}</div>
      <ul>
        {list.map((val: any) => {
          const { id, vote_average } = val;

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
                  className={favoritesStyle.image}
                  type={type}
                  src={`https://image.tmdb.org/t/p/${imageSize}_face/${imagePath}`}
                />
              </Link>
              {type === "person" ? (
                <div className={favoritesStyle.person_info}>
                  <Link
                    href={`/personDetail?id=${id}`}
                    className={favoritesStyle.person_name}
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
                  <div className={favoritesStyle.title_release}>
                    <Link href={`/${link}`} className={favoritesStyle.title}>
                      {title}
                    </Link>
                    <div className={favoritesStyle.release}>{dateFormat}</div>
                  </div>
                </>
              )}
              <div className={favoritesStyle.delete_btn}>
                <button
                  title="즐겨찾기 해제"
                  onClick={() => onClickDelete(id, type, title)}
                >
                  <RemoveCircleIcon
                    style={{ color: "#d72828", fontSize: "30px" }}
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
