import Link from "next/link";
import { KeywordListWrapper } from "@/styles/pages/searchResults/keywordListWrapper";

export default function KeywordList({ list }: any) {
  return (
    <KeywordListWrapper>
      {list.map((val: { id: number; name: string }) => {
        const { id, name } = val;

        return (
          <li key={id}>
            <Link href="">{name}</Link>
          </li>
        );
      })}
    </KeywordListWrapper>
  );
}
