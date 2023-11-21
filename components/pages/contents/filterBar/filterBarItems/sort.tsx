import { Controller } from "react-hook-form";

import filterBarCardStyles from "@styles/pages/contents/filterBar/filterBarCard.module.scss";

export default function Sort({ control }: any) {
  return (
    <div className={filterBarCardStyles.card_item}>
      <div>Sort Results By</div>
      <Controller
        name="sort_by"
        control={control}
        render={({ field }) => (
          <select {...field}>
            <option value="popularity.desc">인기도 내림차순</option>
            <option value="popularity.asc">인기도 오름차순</option>
            <option value="vote_count.desc">평점 내림차순</option>
            <option value="vote_count.asc">평점 오름차순</option>
            <option value="primary_release_date.desc">상영일 내림차순</option>
            <option value="primary_release_date.asc">상영일 오름차순</option>
            <option value="revenue.desc">제목 내림차순</option>
            <option value="revenue.asc">제목 오름차순</option>
          </select>
        )}
      />
    </div>
  );
}
