import Link from "next/link";

export default function KeywordList({
  list,
}: {
  list: {
    id: number;
    name: string;
  }[];
}) {
  return (
    <div>
      {list.map((val: { id: number; name: string }) => {
        const { id, name } = val;

        return (
          <li key={id}>
            <Link href="">{name}</Link>
          </li>
        );
      })}
    </div>
  );
}
