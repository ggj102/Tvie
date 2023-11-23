import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  //   timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

export const popularListApiRequests = (type: string) => {
  const commonQuery =
    "language=ko&watch_region=KR&sort_by=popularity.desc&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&with_runtime.gte=0&with_runtime.lte=400&page=1";
  const movieCommonQuery = `discover/movie?include_adult=false&include_video=false&${commonQuery}`;

  const movieStreamQuery = `${movieCommonQuery}&with_watch_monetization_types=flatrate`;
  const tvStreamQuery = `discover/tv?include_adult=false&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&${commonQuery}`;

  ("tv/popular?language=ko&page=1");

  const movieRentQuery = `${movieCommonQuery}&with_watch_monetization_types=rent`;
  const movieTheaterQuery = `${movieCommonQuery}&with_release_type=3&primary_release_date.gte=2023-10-01&primary_release_date.lte=2023-11-30`;

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
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const mainApi = () => {
  const requests = [
    apiClient.get("trending/all/day?language=ko"),
    ...popularListApiRequests("stream"),
    apiClient.get(
      `discover/movie?include_adult=false&include_video=false&language=ko&watch_region=KR&sort_by=popularity.desc&with_watch_monetization_types=free|ads&with_genres=&vote_average.gte=0&vote_average.lte=10&vote_count.gte=0&with_runtime.gte=0&with_runtime.lte=400&page=1`
    ),
  ];

  return Promise.all(requests)
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const contentDetailApi = (id: string | null, type: string | null) => {
  const typeId = `${type}/${id}`;
  const credites = type === "tv" ? "aggregate_credits" : "credits";

  const requests = [
    apiClient.get(`${typeId}?language=ko`),
    apiClient.get(`${typeId}/${credites}?language=ko`),
    apiClient.get(`${typeId}/keywords`),
  ];

  return Promise.all(requests)
    .then((res) => res)
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
          console.log(val1);

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
