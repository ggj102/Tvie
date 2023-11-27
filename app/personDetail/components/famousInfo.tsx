import Link from "next/link";

import CustomImage from "@/components/common/customImage";

import personDetailStyles from "@styles/pages/personDetail/personDetail.module.scss";
import famousStyles from "@styles/pages/personDetail/famousInfo.module.scss";

export default function FamousInfo({
  famous,
}: {
  famous: PersonDetailDataType[];
}) {
  return (
    <div>
      <div className={personDetailStyles.info_title}>유명 작품</div>
      <div className={famousStyles.famous}>
        <ul>
          {famous.map((val: PersonDetailDataType) => {
            const { id, media_type } = val;
            const title = val.title || val.name;
            return (
              <li key={id}>
                <Link href={`/contentsDetail?type=${media_type}&id=${id}`}>
                  <CustomImage
                    className={famousStyles.famous_image}
                    type="content"
                    src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${val.poster_path}`}
                  />
                </Link>
                <div className={famousStyles.famous_title}>
                  <Link href={`/contentsDetail?type=${media_type}&id=${id}`}>
                    {title}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
