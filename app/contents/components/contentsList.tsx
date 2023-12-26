import Link from "next/link";

import { dateFormatter } from "@/utils/dateFormatter";

import CustomImage from "@/components/customImage";
import VoteAverage from "@/components/voteAverage";
import FavoritesButton from "@/components/favoritesButton";

import contentsListStyles from "@styles/pages/contents/contentsList.module.scss";
import { CircularProgress } from "@mui/material";

export default function ContentsList({
  isSession,
  isAddListLoading,
  listData,
  contentType,
  totalPage,
  onClickAddList,
}: {
  isSession: boolean;
  isAddListLoading: boolean;
  listData: ContentsDataType[];
  contentType: string;
  totalPage: number;
  onClickAddList: () => void;
}) {
  return (
    <div className={contentsListStyles.contents_list}>
      <ul>
        {listData.map((val: ContentsDataType) => {
          const { id, poster_path, vote_average, isFavorites } = val;

          const title = contentType === "movie" ? val.title : val.name;
          const date =
            contentType === "movie" ? val.release_date : val.first_air_date;

          const dateFormat = dateFormatter(date);

          return (
            <li key={id}>
              <Link href={`/contentsDetail?type=${contentType}&id=${id}`}>
                <CustomImage
                  className={contentsListStyles.image}
                  type="content"
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
                />
              </Link>
              {isSession && (
                <div className={contentsListStyles.favorites_area}>
                  <FavoritesButton
                    isFavorites={isFavorites}
                    id={id}
                    type={contentType}
                    size={24}
                  />
                </div>
              )}
              <VoteAverage size={34} top={256} left={8} vote={vote_average} />
              <div className={contentsListStyles.title_release}>
                <Link
                  href={`/contentsDetail?type=${contentType}&id=${id}`}
                  className={contentsListStyles.title}
                >
                  {title}
                </Link>
                <div className={contentsListStyles.release}>{dateFormat}</div>
              </div>
            </li>
          );
        })}
      </ul>
      {totalPage > 20 && (
        <>
          {isAddListLoading ? (
            <div className={contentsListStyles.addList_loading}>
              <CircularProgress
                size={50}
                style={{ color: "var(--main_blue)" }}
              />
            </div>
          ) : (
            <button
              type="button"
              className={contentsListStyles.add_list_btn}
              onClick={onClickAddList}
            >
              더 불러오기
            </button>
          )}
        </>
      )}
    </div>
  );
}
