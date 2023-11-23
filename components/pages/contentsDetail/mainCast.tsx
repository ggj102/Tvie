import CustomImage from "@/components/common/customImage";
import Link from "next/link";

import mainCastStyles from "@styles/pages/contentsDetail/mainCast.module.scss";

export default function MainCast({
  isTypeTV,
  castData,
}: {
  isTypeTV: boolean;
  castData: CastInfoType[];
}) {
  return (
    <div>
      <div className={mainCastStyles.title}>주요 출연진</div>
      <div className={mainCastStyles.cast_list}>
        <ul>
          {castData.map((val: CastInfoType) => {
            const { id, name, roles, profile_path, character } = val;
            return (
              <li key={id}>
                <Link href={`/personDetail?id=${id}`}>
                  <CustomImage
                    className={mainCastStyles.image}
                    type="person"
                    src={`https://image.tmdb.org/t/p/w138_and_h175_face/${profile_path}`}
                  />
                </Link>
                <div>
                  <div className={mainCastStyles.name}>
                    <Link href={`/personDetail?id=${id}`}>{name}</Link>
                  </div>
                  <div className={mainCastStyles.casting}>
                    {isTypeTV && roles ? roles[0].character : character}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
