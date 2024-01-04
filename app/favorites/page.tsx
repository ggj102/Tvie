import { getManagementUser } from "@/api/authZero";
import { apiClient } from "@/api/httpClient";

import RedirectFavorites from "./components/RedirectFavorites";
import FavoritesList from "./components/favoritesList";

import favoritesStyle from "@styles/pages/favorites/favorites.module.scss";

async function ServerSideProps() {
  const userData = await getManagementUser();
  const isSession = !!userData;

  if (!isSession)
    return { isSession, movieList: [], tvList: [], personList: [] };

  const { movie, tv, person } = userData?.user_metadata.favorites;

  const requestsMovie = movie.map((id: string) =>
    apiClient.get(`movie/${id}?language=ko`).then((res) => res.data)
  );

  const requestsTv = tv.map((id: string) =>
    apiClient.get(`tv/${id}?language=ko`).then((res) => res.data)
  );

  const requestsPerson = person.map((id: string) =>
    apiClient
      .get(`person/${id}?append_to_response=combined_credits&language=ko`)
      .then((res) => res.data)
  );

  const movieList = await Promise.all(requestsMovie);
  const tvList = await Promise.all(requestsTv);
  const personList = await Promise.all(requestsPerson);

  return { isSession, movieList, tvList, personList };
}

export default async function FavoritesPage() {
  const { isSession, movieList, tvList, personList } = await ServerSideProps();

  return !isSession ? (
    <RedirectFavorites />
  ) : (
    <div className={favoritesStyle.favorites_container}>
      <div className={favoritesStyle.favorites_title}>즐겨찾기</div>
      <FavoritesList type="movie" listData={movieList} />
      <FavoritesList type="tv" listData={tvList} />
      <FavoritesList type="person" listData={personList} />
    </div>
  );
}
