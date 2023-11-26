import { useState } from "react";
import { FieldValues, SetFieldValue } from "react-hook-form";

import CategoryButtons from "@/components/pages/contents/filterBar/filterBarItems/genreButtons";
import filterBarCardStyles from "@styles/pages/contents/filterBar/filterBarCard.module.scss";

export default function Genre({
  genreData,
  setValue,
}: {
  genreData: GenreDataType[];
  setValue: SetFieldValue<FieldValues>;
}) {
  const [genreArr, setGenreArr] = useState<GenreDataType[]>(genreData);

  const onClickSelect = (idx: number, checked?: boolean) => {
    const copy = [...genreArr];
    copy[idx].checked = !checked;

    setValue("genre", copy, { shouldDirty: true });
    setGenreArr(copy);
  };

  return (
    <div className={filterBarCardStyles.card_item}>
      <div>Genre</div>
      <CategoryButtons categoryData={genreArr} onClickSelect={onClickSelect} />
    </div>
  );
}
