import Link from "next/link";

import personDetailStyles from "@styles/pages/personDetail/personDetail.module.scss";
import careerStyles from "@styles/pages/personDetail/careerInfo.module.scss";

export default function CareerInfo({
  acting,
}: {
  acting: PersonDetailDataType[];
}) {
  return (
    <div>
      <div className={personDetailStyles.info_title}>작품</div>
      <ul className={careerStyles.career}>
        {acting.map((val: PersonDetailDataType, idx: number) => {
          const { id, media_type } = val;
          const title = val.title || val.name;
          const date = val.first_air_date || val.release_date;
          const year = date ? date.substring(0, 4) : "—";

          return (
            <li
              key={`${id}${idx}`}
              className={val.topLine ? careerStyles.top_line : ""}
            >
              <div className={careerStyles.career_year}>{year}</div>
              <div className={careerStyles.dot}>
                <div></div>
              </div>
              <div className={careerStyles.casting}>
                <div>
                  <Link href={`/contentsDetail?type=${media_type}&id=${id}`}>
                    {title}
                  </Link>
                </div>
                <div className={careerStyles.casting_info}>
                  {val.episode_count && (
                    <div className="episode">({val.episode_count} 화)</div>
                  )}
                  {val.character && (
                    <div className="character">{val.character} 역</div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
