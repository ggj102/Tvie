import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  //   timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

export const mainPageAPI = () => {
  apiClient.get("trending/all/day?language=ko");
  apiClient.get("trending/all/day?language=ko");
  apiClient.get("trending/all/day?language=ko");
  apiClient.get("trending/all/day?language=ko");

  const arr = [];
};

export const contentDetailApi = (id: any, type: any) => {
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
      console.error(error);
    });
};

export const searchResultsApi = (value: any) => {
  const commonUrl = `query=${value}&include_adult=false&language=ko&page=1`;
  const requests = [
    apiClient.get(`search/tv?${commonUrl}`),
    apiClient.get(`search/movie?${commonUrl}`),
    apiClient.get(`search/person?${commonUrl}`),
    apiClient.get(`search/collection?${commonUrl}`),
    apiClient.get(`search/company?${commonUrl}`),
    apiClient.get(`search/keyword?${commonUrl}`),
  ];

  return Promise.all(requests)
    .then((res) => {
      const typeArr = [
        "TV 프로그램",
        "영화",
        "인물",
        "컬렉션",
        "제작 및 배급사",
        "키워드",
      ];

      const packing = res.map((val, idx) => {
        return { type: typeArr[idx], data: val.data };
      });

      return packing.sort(
        (val1, val2) => val2.data.total_results - val1.data.total_results
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

export const personDetailApi = (personId: any) => {
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
      const expected: any = [];
      let currentYear = "";
      let famous = [];
      let acting = [];

      famous = sortCopy.sort((val1: any, val2: any) => {
        return val2.vote_count - val1.vote_count;
      });

      if (famous.length > 8) {
        famous = famous.slice(0, 8);
      }

      const releasefilter: any = releaseCopy.filter((val: any) => {
        if (!val.first_air_date && !val.release_date) {
          expected.push(val);
        }

        return val.first_air_date || val.release_date;
      });

      const releaseSort = releasefilter.sort((val1: any, val2: any) => {
        const date1 = val1.first_air_date || val1.release_date;
        const date2 = val2.first_air_date || val2.release_date;

        if (date1 > date2) return -1;
        else if (date1 < date2) return 1;
        else 0;
      });

      acting = releaseSort.map((val: any, idx: number) => {
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
      const biography = split.filter((val: any) => val);

      return { koData, biography, famous, acting };
    })
    .catch((error) => {
      console.error(error);
    });
};
