import Image from "next/image";
import Link from "next/link";
import { CompanyListWrapper } from "@/styles/pages/searchResults/companyListWrapper";

export default function CompanyList({
  list,
}: {
  list: {
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
}) {
  return (
    <CompanyListWrapper>
      {list.map(
        (
          val: {
            name: string;
            logo_path: string;
            origin_country: string;
          },
          idx: number
        ) => {
          const { name, logo_path, origin_country } = val;

          return (
            <li key={`${name}${idx}`}>
              <Link href="">
                {logo_path ? (
                  <div>
                    <Image
                      className="logo_image"
                      src={`https://image.tmdb.org/t/p/h30${logo_path}`}
                      fill
                      sizes="1x"
                      alt="companyLogo"
                    />
                  </div>
                ) : (
                  <span className="companyName">{name}</span>
                )}
                {origin_country && (
                  <div className="nation">{origin_country}</div>
                )}
              </Link>
            </li>
          );
        }
      )}
    </CompanyListWrapper>
  );
}
