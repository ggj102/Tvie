import Image from "next/image";
import Link from "next/link";

import companyListStyles from "@styles/pages/searchResults/companyList.module.scss";

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
    <ul className={companyListStyles.company_list}>
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
                      className={companyListStyles.logo_image}
                      src={`https://image.tmdb.org/t/p/h30${logo_path}`}
                      fill
                      sizes="1x"
                      alt="companyLogo"
                    />
                  </div>
                ) : (
                  <span className={companyListStyles.company_name}>{name}</span>
                )}
                {origin_country && (
                  <div className={companyListStyles.nation}>
                    {origin_country}
                  </div>
                )}
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}
