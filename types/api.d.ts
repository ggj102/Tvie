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

interface CreatedByType {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path?: string;
}
