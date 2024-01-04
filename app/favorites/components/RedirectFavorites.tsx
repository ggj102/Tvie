"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectFavorites() {
  const router = useRouter();

  useEffect(() => {
    alert("접근 권한이 없습니다.\n홈으로 이동합니다.");
    router.replace("/");
    router.refresh();
  }, []);

  return <div></div>;
}
