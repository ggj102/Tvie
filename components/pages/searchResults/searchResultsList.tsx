import Link from "next/link";

import { dateFormatter } from "@/utils/dateFormatter";
import { ContentDataType } from "@/components/pages/contents/contents";
import CustomImage from "@/components/common/customImage";

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
              <CustomImage
                className="contentImage"
                type="content"
                src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${poster_path}`}
              />
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
