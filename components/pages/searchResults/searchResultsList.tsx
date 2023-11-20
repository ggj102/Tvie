import Link from "next/link";

import { dateFormatter } from "@/utils/dateFormatter";
import { ContentDataType } from "@/components/pages/contents/contents";
import CustomImage from "@/components/common/customImage";

import searchResultsListStyles from "@styles/pages/searchResults/searchResultsList.module.scss";

export default function SearchResultsList({
  type,
  list,
}: {
  type: string;
  list: ContentDataType[];
}) {
  return (
    <ul className={searchResultsListStyles.search_results_list}>
      {list.map((val: ContentDataType) => {
        const { id, poster_path, overview } = val;

        const title = val.title || val.name;
        const date = val.release_date || val.first_air_date;

        return (
          <li key={id} className={searchResultsListStyles.list_item}>
            <Link href={`/contentDetail?type=${type}&id=${id}`}>
              <CustomImage
                className={searchResultsListStyles.item_image}
                type="content"
                src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${poster_path}`}
              />
            </Link>
            <div className={searchResultsListStyles.item_info}>
              <div>
                <Link href={`/contentDetail?type=${type}&id=${id}`}>
                  {title}
                </Link>
                {type !== "collection" && (
                  <div className={searchResultsListStyles.item_data}>
                    {dateFormatter(date)}
                  </div>
                )}
                <div className={searchResultsListStyles.item_overview}>
                  {overview}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
