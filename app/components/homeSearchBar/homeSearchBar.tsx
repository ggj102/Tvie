"use client";
import useHomeSearchBar from "./useHomeSearchBar";

import homeSearchBarStyles from "@styles/pages/home/homeSearchBar.module.scss";

export default function HomeSearchBar() {
  const { inputValue, setInputValue, onKeyDownSearch, onClickSearch } =
    useHomeSearchBar();

  return (
    <div className={homeSearchBarStyles.search_bar}>
      <div>
        <div className={homeSearchBarStyles.intro_text}>
          <div>Welcome.</div>
          <div>
            Millions of movies, TV shows and people to discover. Explore now.
          </div>
        </div>
        <div className={homeSearchBarStyles.search_input}>
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
