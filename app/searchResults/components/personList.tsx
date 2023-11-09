import Image from "next/image";
import { PersonListWrapper } from "@/styles/components/searchResults/personListWrapper";

export default function PersonList({ list }: any) {
  return (
    <PersonListWrapper>
      {list.map((val: any, idx: number) => {
        const { name, profile_path, known_for_department, known_for } = val;

        return (
          <li key={`${name}${idx}`}>
            <div className="personImage">
              <Image
                src={`https://image.tmdb.org/t/p/w90_and_h90_face/${profile_path}`}
                fill
                sizes="1x"
                alt="image"
              />
            </div>
            <div className="personInfo">
              <div>
                <div className="personName">
                  <a>{name}</a>
                </div>
                <div>
                  <span className="department">{known_for_department}</span>
                  {known_for &&
                    known_for.map((val: any, idx: number, arr: any) => {
                      const title = val.title || val.name;

                      return (
                        <span key={`${title}${idx}`}>
                          {title}
                          {idx !== arr.length - 1 ? ", " : ""}
                        </span>
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
