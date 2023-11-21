import {
  AirDateType,
  AvailabilitiesType,
  DiscoverDataType,
  GenreDataType,
  ReleaseDateType,
} from "@/components/pages/contents/contents";

const availabilitiesQuery = (data: AvailabilitiesType) => {
  if (data.all_availabilities) return "";
  let monetization = "";

  for (const key in data) {
    if (key === "all_availabilities") continue;

    if (data[key]) {
      const keycheck = key === "stream" ? "flatrate" : key;
      monetization += `${keycheck}|`;
    }
  }

  const slice = monetization.slice(0, -1);
  if (monetization) return `&with_watch_monetization_types=${slice}`;
  return "";
};

const releaseQuery = (data: ReleaseDateType | AirDateType) => {
  if (data.all_releases) return "";
  let releaseType = "";
  const typeNum: {
    [index: string]: number;
    theater_limited: number;
    theater: number;
    premier: number;
    digital: number;
    physical_media: number;
    tv: number;
  } = {
    theater_limited: 2,
    theater: 3,
    premier: 1,
    digital: 4,
    physical_media: 5,
    tv: 6,
  };

  for (const key in data) {
    if (!typeNum[key]) continue;

    if (data[key]) {
      releaseType += `${typeNum[key]}|`;
    }
  }

  const slice = releaseType.slice(0, -1);

  if (releaseType) return `&with_release_type=${slice}`;
  return "";
};

const releaseDateFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
};

const releaseDateQuery = (data: any) => {
  const { release_date_g, release_date_l } = data;

  let gte = "";
  let lte = "";

  if (release_date_g) {
    gte = `&release_date.gte=${releaseDateFormatter(release_date_g)}`;
  }

  if (release_date_l) {
    lte = `&release_date.lte=${releaseDateFormatter(release_date_l)}`;
  }

  return `${gte}${lte}`;
};

const airDateQuery = (data: any) => {
  const { release_date_g, release_date_l } = data;

  let first = !data.all_episodes && data.first_air_date ? "first_" : "";
  let gte = "";
  let lte = "";

  if (release_date_g) {
    gte = `&${first}air_date.gte=${releaseDateFormatter(release_date_g)}`;
  }

  if (release_date_l) {
    lte = `&${first}air_date.lte=${releaseDateFormatter(release_date_l)}`;
  }

  return `${gte}${lte}`;
};

const genreQuery = (data: GenreDataType[]) => {
  const filter = data.filter((val: GenreDataType) => val.checked);
  if (filter.length === 0) return "";

  const genreReduce = filter.reduce(
    (acc: string, val: GenreDataType, idx: number) => {
      const idStr = idx === 0 ? `${val.id}` : `|${val.id}`;
      return acc + `${idStr}`;
    },
    ""
  );

  if (!genreReduce) return "";
  else return `&with_genres=${genreReduce}`;
};

const voteAverageQuery = (data: number[]) => {
  return `&vote_average.gte=${data[0]}&vote_average.lte=${data[1]}`;
};

const runtimeQuery = (data: number[]) => {
  return `&with_runtime.gte=${data[0]}&with_runtime.lte=${data[1]}`;
};

export const discoverQuery = (type: string, data: DiscoverDataType) => {
  // const certificationQuery = `&certification=${genreAndRatingQuery(
  //   data.certification
  // )}&certification_country=KR&region=US`;

  const movieQuery = `${releaseQuery(data.release)}${releaseDateQuery(
    data.release
  )}`;
  const tvQuery = `${airDateQuery(data.release)}`;

  const commonQuery = [
    `&sort_by=${data.sort_by}`,
    availabilitiesQuery(data.availabilities),
    genreQuery(data.genre),
    voteAverageQuery(data.vote_average),
    `&vote_count.gte=${data.vote_count}`,
    runtimeQuery(data.runtime),
  ].join("");

  const query = `${commonQuery}${type === "tv" ? tvQuery : movieQuery}`;

  return query;
};
