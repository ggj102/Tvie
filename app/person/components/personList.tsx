import Link from "next/link";

import CustomImage from "@/components/customImage";

import personStyles from "@styles/pages/person/person.module.scss";
import FavoritesButton from "@/components/favoritesButton";

export default function PersonList({
  isSession,
  personData,
}: {
  isSession: boolean;
  personData: PersonDataType[];
}) {
  return (
    <div className={personStyles.person_list}>
      {personData.map((val: PersonDataType) => {
        const { id, name, known_for, profile_path, isFavorites } = val;
        return (
          <div key={id} className={personStyles.person_card}>
            <Link href={`/personDetail?id=${id}`}>
              <CustomImage
                className={personStyles.image}
                type="person"
                src={`https://image.tmdb.org/t/p/w235_and_h235_face/${profile_path}`}
              />
            </Link>
            {isSession && (
              <div className={personStyles.favorites_area}>
                <FavoritesButton
                  isFavorites={isFavorites}
                  id={id}
                  type="person"
                  size={30}
                />
              </div>
            )}
            <div className={personStyles.person_info}>
              <Link
                href={`/personDetail?id=${id}`}
                className={personStyles.person_name}
              >
                {name}
              </Link>
              <div className={personStyles.person_text}>
                {known_for.map(
                  (
                    val: PersonDetailDataType,
                    idx: number,
                    arr: PersonDetailDataType[]
                  ) => {
                    const title = val.title ? val.title : val.name;

                    return `${title}${idx !== arr.length - 1 ? ", " : ""}`;
                  }
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
