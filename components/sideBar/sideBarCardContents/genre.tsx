import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CategoryButtons from "@/components/categoryButtons";

export default function Genre() {
  const pathname = usePathname();
  const [genreArr, setGenreArr] = useState<any>([]);
  const genreMovieArr = [
    { category: "SF", checked: false },
    { category: "TV 영화", checked: false },
    { category: "가족", checked: false },
    { category: "공포", checked: false },
    { category: "다큐멘터리", checked: false },
    { category: "드라마", checked: false },
    { category: "로맨스", checked: false },
    { category: "모험", checked: false },
    { category: "미스터리", checked: false },
    { category: "범죄", checked: false },
    { category: "서부", checked: false },
    { category: "스릴러", checked: false },
    { category: "애니메이션", checked: false },
    { category: "액션", checked: false },
    { category: "역사", checked: false },
    { category: "음악", checked: false },
    { category: "전쟁", checked: false },
    { category: "코미디", checked: false },
    { category: "판타지", checked: false },
  ];

  const genreTVArr = [
    { category: "Action & Adventure", checked: false },
    { category: "Kids", checked: false },
    { category: "News", checked: false },
    { category: "Reality", checked: false },
    { category: "Sci-Fi & Fantasy", checked: false },
    { category: "Soap", checked: false },
    { category: "Talk", checked: false },
    { category: "War & Politics", checked: false },
    { category: "가족", checked: false },
    { category: "다큐멘터리", checked: false },
    { category: "드라마", checked: false },
    { category: "미스터리", checked: false },
    { category: "범죄", checked: false },
    { category: "서부", checked: false },
    { category: "애니메이션", checked: false },
    { category: "코미디", checked: false },
  ];

  const onClickSelect = (idx: number, checked: boolean) => {
    const copy = [...genreArr];
    copy[idx].checked = !checked;
    setGenreArr(copy);
  };

  useEffect(() => {
    if (pathname === "/movie") setGenreArr(genreMovieArr);
    else setGenreArr(genreTVArr);
  }, [pathname]);

  return (
    <div className="cardContent">
      <div>Genre</div>
      <CategoryButtons categoryData={genreArr} onClickSelect={onClickSelect} />
    </div>
  );
}
