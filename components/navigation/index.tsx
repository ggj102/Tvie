"use client";

import Link from "next/link";
import Image from "next/image";

import useNavigation from "./useNavigation";

import navigationStyles from "@styles/common/navigation.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import NavItem from "./navItem";

export default function Navigation({ isSession }: { isSession: boolean }) {
  const {
    returnToPath,
    inputValue,
    setInputValue,
    onKeyDownSearch,
    onClickSearch,
  } = useNavigation();

  return (
    <div className={navigationStyles.navigation}>
      <div>
        <div className={navigationStyles.flex}>
          <Link href="/">
            <div className={navigationStyles.logo}>
              <Image src="/images/tvieLogo.png" fill sizes="1x" alt="logo" />
            </div>
          </Link>
          <NavItem href="/contents/movie" title="Movie" />
          <NavItem href="/contents/tv" title="TV" />
          <NavItem href="/person" title="Person" />
          <NavItem href="/history" title="히스토리" />
          {isSession && <NavItem href="/favorites" title="즐겨찾기" />}
        </div>
        <div className={navigationStyles.flex}>
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

          <div>
            {!isSession ? (
              <Link
                href={`/api/auth/login?returnTo=${returnToPath}`}
                prefetch={false}
              >
                로그인
              </Link>
            ) : (
              <Link href="/api/auth/logout" prefetch={false}>
                로그아웃
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
