interface personInfoType {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  combined_credits: {
    cast: any[];
    crew: any[];
  };
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}

interface PersonDetailDataType {
  adult: boolean;
  backdrop_path?: string;
  character?: string;
  credit_id?: string;
  episode_count?: number;
  first_air_date?: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  origin_country: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count: number;
  topLine?: boolean;
}
