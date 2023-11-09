import { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchBarWrapper } from "@/styles/pages/index/searchBarWrapper";

export default function SearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const onClickSearch = () => {
    router.push(`/searchResults?search=${inputValue}`);
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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={onClickSearch}>Search</button>
        </div>
      </div>
    </SearchBarWrapper>
  );
}
