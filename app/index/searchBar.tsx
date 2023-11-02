import { SearchBarWrapper } from "@/styles/pages/index/searchBarWrapper";

export default function SearchBar() {
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
          <input />
          <button>Search</button>
        </div>
      </div>
    </SearchBarWrapper>
  );
}
