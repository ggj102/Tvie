import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CategoryButtons from "@/components/pages/contents/filterBar/filterBarCardContents/genreButtons";
import { apiClient } from "@/api/httpClient";
import { FieldValues, SetFieldValue } from "react-hook-form";
import { GenreDataType } from "@/components/pages/contents/contentList";

export default function Genre({
  setValue,
}: {
  setValue: SetFieldValue<FieldValues>;
}) {
  const pathname = usePathname();
  const [genreArr, setGenreArr] = useState<GenreDataType[]>([]);

  useEffect(() => {
    apiClient
      .get(`https://api.themoviedb.org/3/genre${pathname}/list?language=ko`)
      .then((res) => {
        const alphabeticalSort = (a: GenreDataType, b: GenreDataType) => {
          const aIsAlphabet = /^[a-zA-Z]/.test(a.name);
          const bIsAlphabet = /^[a-zA-Z]/.test(b.name);

          if (aIsAlphabet && !bIsAlphabet) {
            return -1; // a는 알파벳이고 b는 한글이므로 a를 먼저 놓음
          } else if (!aIsAlphabet && bIsAlphabet) {
            return 1; // a는 한글이고 b는 알파벳이므로 b를 먼저 놓음
          } else {
            // 둘 다 알파벳이나 둘 다 한글인 경우 또는 둘 다 다른 문자일 경우
            return a.name.localeCompare(b.name);
          }
        };

        const sortedStrings = res.data.genres.sort(alphabeticalSort);
        const checkedMap = sortedStrings.map((val: GenreDataType) => {
          return { ...val, checked: false };
        });

        setValue("genre", checkedMap);
        setGenreArr(checkedMap);
      });
  }, []);

  const onClickSelect = (idx: number, checked?: boolean) => {
    const copy = [...genreArr];
    copy[idx].checked = !checked;

    setValue("genre", copy, { shouldDirty: true });
    setGenreArr(copy);
  };

  return (
    <div className="cardContent">
      <div>Genre</div>
      <CategoryButtons categoryData={genreArr} onClickSelect={onClickSelect} />
    </div>
  );
}
