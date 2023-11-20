import Link from "next/link";

import CustomImage from "@/components/common/customImage";

import famousStyles from "@styles/pages/personDetail/famous.module.scss";

export default function Famous({ famousData }: any) {
  return (
    <div className={famousStyles.famous}>
      <ul>
        {famousData.map((val: any, idx: number) => {
          const { id, media_type } = val;
          const title = val.title || val.name;
          return (
            <li key={id}>
              <Link href={`/contentDetail?type=${media_type}&id=${id}`}>
                <CustomImage
                  className={famousStyles.famous_image}
                  type="content"
                  src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${val.poster_path}`}
                />
              </Link>
              <div className={famousStyles.famous_title}>
                <Link href={`/contentDetail?type=${media_type}&id=${id}`}>
                  {title}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
