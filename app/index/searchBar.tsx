import { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchBarWrapper } from "@/styles/pages/index/searchBarWrapper";

export default function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const onClickSearch = () => {
    router.push(`/searchResults?search=${inputValue}`);
  };

  const onKeyDownSearch = (e: any) => {
    if (e.key === "Enter") {
      router.push(`/searchResults?search=${inputValue}`);
    }
  };

  return (
    <SearchBarWrapper>
      <div>
        <div className="introText">
          <div>Welcome.</div>
          <div>
            Millions of movies, TV shows and people to discover. Explore now.
          </div>
        </div>
        <div className="searchInput">
          <input
            value={inputValue}
            placeholder="영화, TV 프로그램, 인물 검색..."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDownSearch}
          />
          <button onClick={onClickSearch}>Search</button>
        </div>
      </div>
    </SearchBarWrapper>
  );
}
