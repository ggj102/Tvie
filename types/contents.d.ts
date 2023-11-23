interface GenreDataType {
  id: number;
  name: string;
  checked?: boolean;
}

interface ReleaseDateType {
  [index: string]: boolean;
  all_releases: boolean;
  theater_limited: boolean;
  theater: boolean;
  premier: boolean;
  digital: boolean;
  physical_media: boolean;
  tv: boolean;
}

interface AirDateType {
  [index: string]: boolean;
  all_episodes: true;
  first_air_date: true;
}

interface AvailabilitiesType {
  [index: string]: boolean;
  all_availabilities: boolean;
  stream: boolean;
  free: boolean;
  ads: boolean;
  rent: boolean;
  buy: boolean;
}

interface DiscoverDataType {
  sort_by: string;
  availabilities: AvailabilitiesType;
  release: ReleaseDateType | AirDateType;
  release_date_g: Date | null;
  release_date_l: Date | null;
  genre: GenreDataType[];
  vote_average: number[];
  vote_count: 0;
  runtime: number[];
}
