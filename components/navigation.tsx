"use client";

import { NavWrapper } from "@/styles/components/navWrapper";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <NavWrapper>
      <div>
        <div className="navBar flex">
          <Link href="/">
            <div className="logo">
              <Image src="/images/tvieLogo.png" fill alt="logo" />
            </div>
          </Link>

          <Link href="/movie">Movie</Link>
          <Link href="/tv">TV</Link>
          <Link href="/person">Person</Link>
        </div>
        <div className="flex">
          <div>로그인</div>
          <div>회원가입</div>
        </div>
      </div>
    </NavWrapper>
  );
}
