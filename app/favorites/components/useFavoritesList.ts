"use client";

import { favoritesPatch } from "@/lib/api/authZero";
import { useState } from "react";

export default function useFavoritesList(listData: any) {
  const [list, setList] = useState<any>(listData);
  const titleConnectObj: {
    [index: string]: string;
    movie: string;
    tv: string;
    person: string;
  } = {
    movie: "영화",
    tv: "TV",
    person: "인물",
  };

  const onClickDelete = (id: any, type: string, title: string) => {
    const isConfirmed = confirm(
      `${titleConnectObj[type]} [${title}]을(를) 삭제 하시겠습니까?`
    );

    if (isConfirmed) {
      favoritesPatch(id, type).then((res) => {
        if (res) {
          const copy = [...list];
          const filter = copy.filter((val) => val.id !== id);

          setList(filter);
        }
      });
    }
  };

  return { list, titleConnectObj, onClickDelete };
}
