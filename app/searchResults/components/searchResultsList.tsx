import Image from "next/image";
import PersonList from "./personList";
import CompanyList from "./companyList";
import KeywordList from "./keywordList";

import { dateFormatter } from "@/utils/dateFormatter";
import Link from "next/link";

export default function SearchResultsList({ list }: any) {
  switch (list.type) {
    case "person":
      return <PersonList list={list.data.results} />;
    case "company":
      return <CompanyList list={list.data.results} />;
    case "keyword":
      return <KeywordList list={list.data.results} />;
    default:
      return (
        <ul className="searchResultsList">
          {list.data.results.map((val: any, idx: number) => {
            const { id, poster_path, overview } = val;

            const title = val.title || val.name;
            const date = val.release_date || val.first_air_date;

            return (
              <li key={id} className="contentCard">
                <Link href={`/contentDetail?type=${list.type}&id=${id}`}>
                  <div className="contentImage">
                    <Image
                      src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${poster_path}`}
                      fill
                      sizes="1x"
                      alt="image"
                    />
                  </div>
                </Link>
                <div className="contentInfo">
                  <div>
                    <Link href={`/contentDetail?type=${list.type}&id=${id}`}>
                      {title}
                    </Link>
                    {list.type !== "collection" && (
                      <div className="contentDate">{dateFormatter(date)}</div>
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
