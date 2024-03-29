"use client";
import { useState } from "react";

import { favoritesPatch } from "@/lib/api/authZero";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CircularProgress from "@mui/material/CircularProgress";

import favoritesButtonStyles from "@styles/common/favoritesButton.module.scss";

export default function FavoritesButton({
  isFavorites,
  id,
  type,
  size,
}: {
  isFavorites?: boolean;
  id: any;
  type: string;
  size: number;
}) {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(isFavorites);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickFavorites = () => {
    setIsLoading(true);
    favoritesPatch(id, type).then((res) => {
      if (res) setIsChecked(!isChecked);

      setIsLoading(false);
    });
  };

  return isLoading ? (
    <div className={favoritesButtonStyles.favorites_mark}>
      <CircularProgress size={size} style={{ color: "var(--main_blue)" }} />
    </div>
  ) : (
    <button
      title="즐겨찾기"
      className={favoritesButtonStyles.favorites_mark}
      onClick={onClickFavorites}
    >
      {isChecked ? (
        <StarIcon
          style={{ color: "var(--main_blue)", fontSize: `${size}px` }}
        />
      ) : (
        <StarBorderIcon style={{ color: "gray", fontSize: `${size}px` }} />
      )}
    </button>
  );
}
