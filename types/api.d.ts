interface ServerResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface ContentsDataType {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average?: number;
  vote_count?: number;
}

interface CastInfoType {
  adult: boolean;
  cast_id: number;
  roles?: {
    character: string;
    credit_id: string;
    episode_count: number;
  }[];
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface EpisodeToAirType {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface ContentsInfoType {
  adult: boolean;
  backdrop_path: string;
  genres: GenreDataType[];
  homepage: string;
  id: number;
  production_companies: {
    id: number;
    logo_path?: string;
    name?: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface CreatedByType {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path?: string;
}

interface TVShowInfoType extends ContentsInfoType {
  created_by: CreatedByType[];
  episode_run_time: number[];
  first_air_date: string;

  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeToAirType;
  name: string;
  networks: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: null | EpisodeToAirType;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;

  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];

  status: string;
  tagline: string;
  type: string;
}

interface MovieInfoType extends ContentsInfoType {
  belongs_to_collection: null | any;
  budget: number;

  imdb_id: string;
  original_language: string;
  original_title: string;

  release_date: string;
  revenue: number;
  runtime: number;

  status: string;
  tagline: string;
  title: string;
  video: boolean;
}
