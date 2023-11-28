"use client";

import Link from "next/link";
import Image from "next/image";

import useNavigation from "./useNavigation";

import navigationStyles from "@styles/common/navigation.module.scss";
import SearchIcon from "@mui/icons-material/Search";

export default function Navigation() {
  const { inputValue, setInputValue, onKeyDownSearch, onClickSearch } =
    useNavigation();

  return (
    <div className={navigationStyles.navigation}>
      <div>
        <div className={navigationStyles.flex}>
          <Link href="/">
            <div className={navigationStyles.logo}>
              <Image src="/images/tvieLogo.png" fill sizes="1x" alt="logo" />
            </div>
          </Link>

          <Link href="/contents/movie">Movie</Link>
          <Link href="/contents/tv">TV</Link>
          <Link href="/person">Person</Link>
        </div>
        <div className={navigationStyles.flex}>
          {/* <div>로그인</div>
          <div>회원가입</div> */}
          <div className={navigationStyles.search_input}>
            <input
              value={inputValue}
              placeholder="영화, TV, 인물 검색..."
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDownSearch}
            />
            <button onClick={onClickSearch}>
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
