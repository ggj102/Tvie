"use client";

import Link from "next/link";
import Image from "next/image";

import navigationStyles from "@styles/common/navigation.module.scss";

export default function Navigation() {
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
        {/* <div className={navigationStyles.flex}>
          <div>로그인</div>
          <div>회원가입</div>
        </div> */}
      </div>
    </div>
  );
}
