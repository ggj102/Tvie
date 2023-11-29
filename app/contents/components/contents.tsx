"use client";

import FilterBar from "./filterBar/filterBar";
import ContentsList from "./contentsList";

import contentsStyles from "@styles/pages/contents/contents.module.scss";
import useContents from "./useContents";

export default function Contents({
  contentType,
  list,
  genreData,
  total_Pages,
}: {
  contentType: string;
  list: ContentsDataType[];
  genreData: GenreDataType[];
  total_Pages: number;
}) {
  const {
    defaultDiscoverData,
    listData,
    totalPages,
    onSubmitDiscover,
    onClickAddList,
  } = useContents(contentType, list, total_Pages);

  return (
    <div className={contentsStyles.contents}>
      <div className={contentsStyles.contents_title}>
        {contentType === "movie" ? "인기 영화" : "인기 TV 프로그램"}
      </div>
      <div className={contentsStyles.content_area}>
        <FilterBar
          contentType={contentType}
          defaultData={defaultDiscoverData}
          genreData={genreData}
          onSubmit={onSubmitDiscover}
        />
        <ContentsList
          listData={listData}
          contentType={contentType}
          totalPage={totalPages}
          onClickAddList={onClickAddList}
        />
      </div>
    </div>
  );
}
