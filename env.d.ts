declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_TMDB_ARIKEY: string;
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: string;

    AUTH0_SECRET: string;
    AUTH0_BASE_URL: string;
    AUTH0_ISSUER_BASE_URL: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
  }
}
