import axios from "axios";
import { dataRandomSort } from "@/utils/dataRandomSort";
import { favoritesCheck, getManagementUser } from "./authZero";

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  //   timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

export const popularListApiRequests = (type: string) => {
  const currentDate = new Date();
  const pre = new Date(currentDate);
  pre.setDate(1);

  const next = new Date(currentDate);
  next.setMonth(currentDate.getMonth() + 2, 0);

  const preDate = `${pre.getFullYear()}-${pre.getMonth()}=${pre.getDate()}`;
  const nextDate = `${next.getFullYear()}-${next.getMonth()}=${next.getDate()}`;

  const commonQuery =
    "language=ko&watch_region=KR&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&with_runtime.gte=0&with_runtime.lte=400&page=1";
  const movieCommonQuery = `discover/movie?include_adult=false&include_video=false&${commonQuery}`;

  const movieStreamQuery = `${movieCommonQuery}&with_watch_monetization_types=flatrate`;
  const tvStreamQuery = `discover/tv?include_adult=false&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&${commonQuery}`;

  const movieRentQuery = `${movieCommonQuery}&with_watch_monetization_types=rent`;
  const movieTheaterQuery = `${movieCommonQuery}&with_release_type=3&primary_release_date.gte=${preDate}&primary_release_date.lte=${nextDate}`;

  let requests = [];

  switch (type) {
    case "stream":
      requests.push(apiClient.get(movieStreamQuery));
      requests.push(apiClient.get(tvStreamQuery));
      break;
    case "tv":
      requests.push(apiClient.get("tv/popular?language=ko&page=1"));
      break;
    case "rent":
      requests.push(apiClient.get(movieRentQuery));
      break;
    case "theater":
      requests.push(apiClient.get(movieTheaterQuery));
      break;
  }

  return requests;
};

export const popularListApi = (type: string) => {
  const requests = popularListApiRequests(type);

  return Promise.all(requests)
    .then((res) => {
      return dataRandomSort(res);
    })
    .catch((error) => {
      throw error;
    });
};

export const homeApi = async () => {
  const userData = await getManagementUser();
  const isSession = !!userData;

  const requests = [
    apiClient.get("trending/all/day?language=ko"),
    ...popularListApiRequests("stream"),
    apiClient.get(
      `discover/movie?include_adult=false&include_video=false&language=ko&watch_region=KR&sort_by=popularity.desc&with_watch_monetization_types=free|ads&with_genres=&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&with_runtime.gte=0&with_runtime.lte=400&page=1`
    ),
  ];

  return Promise.all(requests)
    .then((res) => {
      const data = [[res[0]], [res[1], res[2]], [res[3]]];
      const sortMap = data.map((val) => dataRandomSort(val));

      let listData = sortMap.map((val: any) => {
        if (userData?.user_metadata.favorites) {
          const { favorites } = userData?.user_metadata;

          return val.map((val: any) => {
            return favoritesCheck(val, favorites);
          });
        } else
          return val.map((val: any) => {
            return { ...val, isFavorites: null };
          });
      });

      const [trendingData, popularData, freeWatchData] = listData;

      const bannerImg = trendingData[0].backdrop_path;

      const homeData = {
        isSession,
        trendingData,
        popularData,
        freeWatchData,
      };

      return { bannerImg, homeData };
    })
    .catch((error) => {
      throw error;
    });
};

export const genreApi = (contentType: string) => {
  return apiClient
    .get(`https://api.themoviedb.org/3/genre/${contentType}/list?language=ko`)
    .then((res) => {
      const alphabeticalSort = (a: GenreDataType, b: GenreDataType) => {
        const aIsAlphabet = /^[a-zA-Z]/.test(a.name);
        const bIsAlphabet = /^[a-zA-Z]/.test(b.name);

        if (aIsAlphabet && !bIsAlphabet) {
          return -1; // a는 알파벳이고 b는 한글이므로 a를 먼저 놓음
        } else if (!aIsAlphabet && bIsAlphabet) {
          return 1; // a는 한글이고 b는 알파벳이므로 b를 먼저 놓음
        } else {
          // 둘 다 알파벳이나 둘 다 한글인 경우 또는 둘 다 다른 문자일 경우
          return a.name.localeCompare(b.name);
        }
      };
      const copy = [...res.data.genres];

      const sortedStrings = copy.sort(alphabeticalSort);
      return sortedStrings.map((val: GenreDataType) => {
        return { ...val, checked: false };
      });
    });
};

export const contentsDetailApi = (id: string | null, type: string | null) => {
  const typeId = `${type}/${id}`;
  const credites = type === "tv" ? "aggregate_credits" : "credits";

  const requests = [
    apiClient.get(`${typeId}?language=ko`),
    apiClient.get(`${typeId}/${credites}?language=ko`),
    apiClient.get(`${typeId}/keywords`),
    apiClient.get(`${typeId}/videos?language=en-US`),
  ];

  return Promise.all(requests)
    .then((res) => {
      // console.log(res[3].data.results, "데이터");
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const searchResultsApi = (value: string | null) => {
  const commonUrl = `query=${value}&include_adult=false&language=ko&page=1`;
  const requests = [
    apiClient.get(`search/tv?${commonUrl}`),
    apiClient.get(`search/movie?${commonUrl}`),
    apiClient.get(`search/person?${commonUrl}`),
    // apiClient.get(`search/collection?${commonUrl}`),
    // apiClient.get(`search/company?${commonUrl}`),
    // apiClient.get(`search/keyword?${commonUrl}`),
  ];

  return Promise.all(requests)
    .then((res) => {
      const typeArr = [
        "tv",
        "movie",
        "person",
        // "collection",
        // "company",
        // "keyword",
      ];

      const packing = res.map((val, idx) => {
        return { data: val.data, type: typeArr[idx] };
      });

      return packing.sort(
        (val1, val2) => val2.data.total_results - val1.data.total_results
      );
    })
    .catch((error) => {
      throw error;
    });
};

export const personDetailApi = (personId: string | null) => {
  const requests = [
    apiClient.get(
      `person/${personId}?append_to_response=combined_credits&language=ko`
    ),
    apiClient.get(`person/${personId}?language=en`),
  ];

  return Promise.all(requests)
    .then((res) => {
      const [koData, enData] = res;

      const { cast } = koData.data.combined_credits;
      const sortCopy = [...cast];
      const releaseCopy = [...cast];
      const expected: PersonDetailDataType[] = [];
      let currentYear = "";
      let famous = [];
      let acting = [];

      famous = sortCopy.sort(
        (val1: PersonDetailDataType, val2: PersonDetailDataType) => {
          return val2.vote_count - val1.vote_count;
        }
      );

      if (famous.length > 8) {
        famous = famous.slice(0, 8);
      }

      const releasefilter: PersonDetailDataType[] = releaseCopy.filter(
        (val: PersonDetailDataType) => {
          if (!val.first_air_date && !val.release_date) {
            expected.push(val);
          }

          return val.first_air_date || val.release_date;
        }
      );

      const releaseSort = releasefilter.sort(
        (val1: PersonDetailDataType, val2: PersonDetailDataType) => {
          const date1 = val1.first_air_date || val1.release_date || "";
          const date2 = val2.first_air_date || val2.release_date || "";

          if (date1 > date2) return -1;
          else if (date1 < date2) return 1;
          else return 0;
        }
      );

      acting = releaseSort.map((val: PersonDetailDataType, idx: number) => {
        const date = val.first_air_date || val.release_date;
        const checkDate = !date ? "" : date.slice(0, 4);
        if (idx !== 0 && currentYear !== checkDate) {
          currentYear = checkDate;
          return { ...val, topLine: true };
        } else return val;
      });

      if (expected.length > 0) {
        acting[0] = { ...acting[0], topLine: true };
        expected.reverse();
        acting = expected.concat(acting);
      }

      const split = enData.data.biography.split("\n");
      const biography = split.filter((val: string) => val);

      return { koData, biography, famous, acting };
    })
    .catch((error) => {
      throw error;
    });
};
