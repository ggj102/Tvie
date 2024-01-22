"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import addHistory from "@/utils/addHistory";

export default function ContentsDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    addHistory(type, id);
  }, []);

  return <div>{children}</div>;
}
