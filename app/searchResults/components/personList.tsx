import Image from "next/image";
import { PersonListWrapper } from "@/styles/components/searchResults/personListWrapper";
import Link from "next/link";

export default function PersonList({ list }: any) {
  return (
    <PersonListWrapper>
      {list.map((val: any, idx: number) => {
        const { id, name, profile_path, known_for_department, known_for } = val;

        return (
          <li key={id}>
            <Link href={`/personDetail?id=${id}`}>
              <div className="personImage">
                <Image
                  src={`https://image.tmdb.org/t/p/w90_and_h90_face/${profile_path}`}
                  fill
                  sizes="1x"
                  alt="image"
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
                    known_for.map((val: any, idx: number, arr: any) => {
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
                    })}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </PersonListWrapper>
  );
}
