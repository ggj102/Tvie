import axios from "axios";
import { favoritesCheck } from "@/api/authZero";

export const addFavoritesList = (listData: any) => {
  return axios.get("/api/users/favorites").then((res) => {
    const userData = res.data;

    return listData.map((val: any) => {
      if (userData?.user_metadata.favorites) {
        const { favorites } = userData?.user_metadata;
        return favoritesCheck(val, favorites);
      } else return { ...val, isFavorites: null };
    });
  });
};
