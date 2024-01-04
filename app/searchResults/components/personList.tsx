"use client";

import Link from "next/link";

import { Pagination } from "@mui/material";

import useSearchResults from "./useSearchResults";
import CustomImage from "@/components/customImage";

import searchResultsStyles from "@styles/pages/searchResults/searchResults.module.scss";
import personListStyles from "@styles/pages/searchResults/personList.module.scss";
import FavoritesButton from "@/components/favoritesButton";

export default function PersonList({
  isSession,
  list,
  totalPages,
}: {
  isSession: boolean;
  list: any;
  totalPages: number;
}) {
  const { searchData, currentPage, onChangePagination } = useSearchResults(
    "person",
    list
  );

  return (
    <>
      <ul className={personListStyles.person_list}>
        {searchData.map((val: PersonDataType) => {
          const {
            id,
            name,
            profile_path,
            known_for_department,
            known_for,
            isFavorites,
          } = val;

          return (
            <li key={id}>
              <Link href={`/personDetail?id=${id}`}>
                <CustomImage
                  className={personListStyles.item_image}
                  type="person"
                  src={`https://image.tmdb.org/t/p/w90_and_h90_face/${profile_path}`}
                />
              </Link>
              <div className={personListStyles.item_info}>
                <div>
                  <div className={personListStyles.item_name}>
                    <Link href={`/personDetail?id=${id}`}>{name}</Link>
                    {isSession && (
                      <FavoritesButton
                        isFavorites={isFavorites}
                        id={id}
                        type="person"
                        size={24}
                      />
                    )}
                  </div>
                  <div>
                    <span className={personListStyles.department}>
                      {known_for_department}
                    </span>
                    {known_for &&
                      known_for.map(
                        (
                          val: PersonDetailDataType,
                          idx: number,
                          arr: PersonDetailDataType[]
                        ) => {
                          const { id: contentId, media_type } = val;

                          const title = val.title || val.name;

                          return (
                            <Link
                              key={`${contentId}${id}`}
                              href={`/contentsDetail?type=${media_type}&id=${contentId}`}
                            >
                              <span>
                                {title}
                                {idx !== arr.length - 1 ? ", " : ""}
                              </span>
                            </Link>
                          );
                        }
                      )}
                  </div>
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
