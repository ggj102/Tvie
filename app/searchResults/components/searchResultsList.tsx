import Link from "next/link";
import Image from "next/image";

import { dateFormatter } from "@/utils/dateFormatter";
import { ContentDataType } from "@/components/contentList";

export default function SearchResultsList({
  type,
  list,
}: {
  type: string;
  list: ContentDataType[];
}) {
  return (
    <ul className="searchResultsList">
      {list.map((val: ContentDataType) => {
        const { id, poster_path, overview } = val;

        const title = val.title || val.name;
        const date = val.release_date || val.first_air_date;

        return (
          <li key={id} className="contentCard">
            <Link href={`/contentDetail?type=${type}&id=${id}`}>
              <div className="contentImage">
                <Image
                  src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${poster_path}`}
                  fill
                  sizes="1x"
                  alt="image"
                />
              </div>
            </Link>
            <div className="contentInfo">
              <div>
                <Link href={`/contentDetail?type=${type}&id=${id}`}>
                  {title}
                </Link>
                {type !== "collection" && (
                  <div className="contentDate">{dateFormatter(date)}</div>
                )}
                <div className="contentOverview">{overview}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
