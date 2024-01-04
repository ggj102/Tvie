"use client";

import Link from "next/link";

import { Pagination } from "@mui/material";

import { dateFormatter } from "@/utils/dateFormatter";
import CustomImage from "@/components/customImage";

import searchResultsStyles from "@styles/pages/searchResults/searchResults.module.scss";
import searchResultsListStyles from "@styles/pages/searchResults/searchResultsList.module.scss";

import useSearchResults from "./useSearchResults";
import FavoritesButton from "@/components/favoritesButton";

export default function SearchResultsList({
  type,
  isSession,
  list,
  totalPages,
}: {
  type: string;
  isSession: boolean;
  list: ContentsDataType[];
  totalPages: number;
}) {
  const { searchData, currentPage, onChangePagination } = useSearchResults(
    type,
    list
  );

  return (
    <>
      <ul className={searchResultsListStyles.search_results_list}>
        {searchData.map((val: ContentsDataType) => {
          const { id, poster_path, overview, isFavorites } = val;

          const title = val.title || val.name;
          const date = val.release_date || val.first_air_date;

          return (
            <li key={id} className={searchResultsListStyles.list_item}>
              <Link href={`/contentsDetail?type=${type}&id=${id}`}>
                <CustomImage
                  className={searchResultsListStyles.item_image}
                  type="content"
                  src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${poster_path}`}
                />
              </Link>
              <div className={searchResultsListStyles.item_info}>
                <div className={searchResultsListStyles.title_bar}>
                  <Link href={`/contentsDetail?type=${type}&id=${id}`}>
                    {title}
                  </Link>
                  {isSession && (
                    <FavoritesButton
                      isFavorites={isFavorites}
                      id={id}
                      type={type}
                      size={24}
                    />
                  )}
                </div>
                {type !== "collection" && (
                  <div className={searchResultsListStyles.item_data}>
                    {dateFormatter(date)}
                  </div>
                )}
                <div className={searchResultsListStyles.item_overview}>
                  {overview}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {totalPages !== 1 && (
        <div className={searchResultsStyles.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            defaultPage={1}
            boundaryCount={2}
            siblingCount={3}
            hidePrevButton={currentPage === 1}
            hideNextButton={currentPage === totalPages}
            onChange={onChangePagination}
          />
        </div>
      )}
    </>
  );
}
