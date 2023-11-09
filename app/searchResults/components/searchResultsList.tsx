import Image from "next/image";
import PersonList from "./personList";
import CompanyList from "./companyList";
import KeywordList from "./keywordList";

import { dateFormater } from "@/utils/dateFormater";

export default function SearchResultsList({ list }: any) {
  switch (list.type) {
    case "인물":
      return <PersonList list={list.data.results} />;
    case "제작 및 배급사":
      return <CompanyList list={list.data.results} />;
    case "키워드":
      return <KeywordList list={list.data.results} />;
    default:
      return (
        <ul className="searchResultsList">
          {list.data.results.map((val: any, idx: number) => {
            const { poster_path, overview } = val;

            const title = val.title || val.name;
            const date = val.release_date || val.first_air_date;

            return (
              <li key={`${title}${idx}`} className="contentCard">
                <div className="contentImage">
                  <Image
                    src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${poster_path}`}
                    fill
                    sizes="1x"
                    alt="image"
                  />
                </div>
                <div className="contentInfo">
                  <div>
                    <a>{title}</a>
                    {list.type !== "컬렉션" && (
                      <div className="contentDate">{dateFormater(date)}</div>
                    )}
                    <div className="contentOverview">{overview}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
  }
}
