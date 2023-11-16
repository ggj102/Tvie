import { PersonListWrapper } from "@/styles/pages/searchResults/personListWrapper";
import Link from "next/link";
import { PersonDataType } from "@/app/person/page";
import { PersonDetailDataType } from "@/app/personDetail/page";
import CustomImage from "@/components/customImage";

export default function PersonList({ list }: { list: PersonDataType[] }) {
  return (
    <PersonListWrapper>
      {list.map((val: PersonDataType) => {
        const { id, name, profile_path, known_for_department, known_for } = val;

        return (
          <li key={id}>
            <Link href={`/personDetail?id=${id}`}>
              <div className="personImage">
                <CustomImage
                  type="person"
                  src={`https://image.tmdb.org/t/p/w90_and_h90_face/${profile_path}`}
                />
              </div>
            </Link>
            <div className="personInfo">
              <div>
                <div className="personName">
                  <Link href={`/personDetail?id=${id}`}>{name}</Link>
                </div>
                <div>
                  <span className="department">{known_for_department}</span>
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
    </PersonListWrapper>
  );
}
