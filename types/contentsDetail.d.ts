interface KeywordType {
  id: number;
  name: string;
}

interface KeywordDataType {
  id: number;
  keywords?: KeywordType[];
  results?: KeywordType[];
}

interface ContentsDetailDataType {
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
  title: string;
  original_title: string;
  tagline: string;
  original_language: string;
  status: string;
  //tv
  created_by: CreatedByType[];
  // movie
  runtime: number;
  budget: number;
  revenue: number;
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

  type: string;
}

interface MovieInfoType extends ContentsInfoType {
  belongs_to_collection: null | any;
  budget: number;

  imdb_id: string;
  original_title: string;

  release_date: string;
  revenue: number;
  runtime: number;

  title: string;
  video: boolean;
}
