import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";

import searchBarStyles from "@styles/pages/home/searchBar.module.scss";

export default function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const onClickSearch = () => {
    router.push(`/searchResults?search=${inputValue}`);
  };

  const onKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/searchResults?search=${inputValue}`);
    }
  };

  return (
    <div className={searchBarStyles.search_bar}>
      <div>
        <div className={searchBarStyles.intro_text}>
          <div>Welcome.</div>
          <div>
            Millions of movies, TV shows and people to discover. Explore now.
          </div>
        </div>
        <div className={searchBarStyles.search_input}>
          <input
            value={inputValue}
            placeholder="영화, TV 프로그램, 인물 검색..."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDownSearch}
          />
          <button onClick={onClickSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}
