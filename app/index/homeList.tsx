import Link from "next/link";
import Image from "next/image";

import { dateFormatter } from "@/utils/dateFormatter";

export default function HomeList({ listData, listRef }: any) {
  return (
    <ul ref={listRef} className="contentList">
      {listData.map((val: any) => {
        const { id, poster_path, vote_average } = val;
        const vote = `${Math.floor(vote_average * 10)}%`;
        const date = val.first_air_date || val.release_date;
        const type = val.hasOwnProperty("title") ? "movie" : "tv";

        return (
          <li key={id}>
            <Link href={`/contentDetail?type=${type}&id=${id}`}>
              <div className="contentImg">
                <Image
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
                  fill
                  sizes="1x"
                  alt="contentImg"
                />
              </div>
            </Link>
            <div className="score">{vote}</div>
            <div className="titleRelease">
              <Link
                className="title"
                href={`/contentDetail?type=${type}&id=${id}`}
              >
                <div>{val.name || val.title}</div>
              </Link>

              <div className="release">{dateFormatter(date)}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
