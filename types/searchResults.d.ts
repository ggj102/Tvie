type ConnetType = {
  [index: string]: string;
  tv: string;
  movie: string;
  person: string;
  collection: string;
  company: string;
  keyword: string;
};

type SearchResultsDataType = {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
};

type SearchResultsResType = {
  data: SearchResultsDataType;
  type: string;
};
