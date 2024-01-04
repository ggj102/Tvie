import { ManagementClient } from "auth0";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import PQueue from "p-queue";

const queue = new PQueue({ concurrency: 1 });

export const authManagement = new ManagementClient({
  domain: "dev-baluusoj6la1t0m1.us.auth0.com",
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

export const getUserData = async () => {
  const session = await getSession();

  return session?.user;
};

export const getManagementUser = async () => {
  const session = await getUserData();
  if (session) {
    const data = await authManagement.users.get({ id: `${session.sub}` });

    return data.data;
  }
  return null;
};

export const initUser = async (data: any) => {
  const params = { id: `${data.user_id}` };

  const metadata = {
    user_metadata: {
      ...data.user_metadata,
      favorites: {
        movie: [],
        tv: [],
        person: [],
      },
    },
  };

  return authManagement.users
    .update(params, metadata)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const favoritesCheck = (data: any, favorites: any) => {
  let type = "person";

  if (data.release_date) type = "movie";
  else if (data.first_air_date) type = "tv";

  const includes = favorites[type].includes(`${data.id}`);

  return { ...data, isFavorites: includes };
};

export const favoitesList = (userData: any, listData: any) => {
  return listData.map((val: any) => {
    if (userData?.user_metadata.favorites) {
      const { favorites } = userData?.user_metadata;
      return favoritesCheck(val, favorites);
    } else return { ...val, isFavorites: null };
  });
};

export const initFavoritesList = async (listData: any) => {
  const userData = await getManagementUser();

  return favoitesList(userData, listData);
};

export const addFavoritesList = async (listData: any) => {
  return axios.get("/api/users/favorites").then((res) => {
    const userData = res.data;

    if (userData === "Unauthorized") {
      alert("세션이 만료되었습니다.");
      window.location.reload();
      window.scrollTo({ top: 0 });
      throw res;
    } else return favoitesList(userData, listData);
  });
};

export const favoritesPatch = async (id: any, type: string) => {
  const path = `/api/users/favorites?contents_id=${id}&contents_type=${type}`;
  return queue
    .add(() => axios.patch(path))
    .then((res: any) => {
      if (res.data === "Unauthorized") {
        alert("세션이 만료되었습니다.");
        window.location.reload();
        window.scrollTo({ top: 0 });
        throw res;
      } else return res;
    })
    .catch((error) => {
      throw error;
    });
};
