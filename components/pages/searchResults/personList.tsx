import Link from "next/link";
import CustomImage from "@/components/common/customImage";

import personListStyles from "@styles/pages/searchResults/personList.module.scss";

export default function PersonList({ list }: { list: PersonDataType[] }) {
  return (
    <ul className={personListStyles.person_list}>
      {list.map((val: PersonDataType) => {
        const { id, name, profile_path, known_for_department, known_for } = val;

        return (
          <li key={id}>
            <Link href={`/personDetail?id=${id}`}>
              <CustomImage
                className={personListStyles.item_image}
                type="person"
                src={`https://image.tmdb.org/t/p/w90_and_h90_face/${profile_path}`}
              />
            </Link>
            <div className={personListStyles.item_info}>
              <div>
                <div className={personListStyles.item_name}>
                  <Link href={`/personDetail?id=${id}`}>{name}</Link>
                </div>
                <div>
                  <span className={personListStyles.department}>
                    {known_for_department}
                  </span>
                  {known_for &&
                    known_for.map(
                      (
                        val: PersonDetailDataType,
                        idx: number,
                        arr: PersonDetailDataType[]
                      ) => {
                        const { id: contentId, media_type } = val;

                        const title = val.title || val.name;

                        return (
                          <Link
                            key={`${contentId}${id}`}
                            href={`/contentDetail?type=${media_type}&id=${contentId}`}
                          >
                            <span>
                              {title}
                              {idx !== arr.length - 1 ? ", " : ""}
                            </span>
                          </Link>
                        );
                      }
                    )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
