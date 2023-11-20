import { dateFormatter } from "@/utils/dateFormatter";
import { ContentDataType } from "./contents";
import Link from "next/link";
import CustomImage from "@/components/common/customImage";

import contentsListStyles from "@styles/pages/contents/contentsList.module.scss";

export default function ContentsList({
  listData,
  contentType,
  totalPage,
  onClickAddList,
}: {
  listData: ContentDataType[];
  contentType: string;
  totalPage: number;
  onClickAddList: any;
}) {
  return (
    <div className={contentsListStyles.contents_list}>
      <ul>
        {listData.map((val: ContentDataType) => {
          const { id, poster_path, vote_average } = val;

          const title = contentType === "movie" ? val.title : val.name;
          const date =
            contentType === "movie" ? val.release_date : val.first_air_date;
          const vote = `${Math.floor(vote_average ? vote_average * 10 : 0)}%`;
          const dateFormat = dateFormatter(date);

          return (
            <li key={id}>
              <Link href={`/contentDetail?type=${contentType}&id=${id}`}>
                <CustomImage
                  className={contentsListStyles.image}
                  type="content"
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
                />
              </Link>
              <div className={contentsListStyles.vote_average}>{vote}</div>
              <div className={contentsListStyles.title_release}>
                <Link
                  href={`/contentDetail?type=${contentType}&id=${id}`}
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
        <button
          type="button"
          className={contentsListStyles.add_list_btn}
          onClick={onClickAddList}
        >
          더 불러오기
        </button>
      )}
    </div>
  );
}