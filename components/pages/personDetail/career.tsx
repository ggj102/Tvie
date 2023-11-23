import Link from "next/link";

import careerStyles from "@styles/pages/personDetail/career.module.scss";

export default function Career({ acting }: { acting: PersonDetailDataType[] }) {
  return (
    <ul className={careerStyles.career}>
      {acting.map((val: PersonDetailDataType) => {
        const { id, media_type } = val;
        const title = val.title || val.name;
        const date = val.first_air_date || val.release_date;
        const year = date ? date.substring(0, 4) : "—";

        return (
          <li key={id} className={val.topLine ? careerStyles.top_line : ""}>
            <div className={careerStyles.career_year}>{year}</div>
            <div className={careerStyles.dot}>
              <div></div>
            </div>
            <div className={careerStyles.casting}>
              <div>
                <Link href={`/contentDetail?type=${media_type}&id=${id}`}>
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
  );
}
