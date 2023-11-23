interface KeywordType {
  id: number;
  name: string;
}

interface KeywordDataType {
  id: number;
  keywords?: KeywordType[];
  results?: KeywordType[];
}
