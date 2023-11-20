import { CategoryButtonsWrapper } from "@/styles/components/sideBar/sideBarCardContents/categoryButtonsWrapper";

export type CategoryDataType = {
  id: number;
  name: string;
  checked?: boolean;
};

export default function CategoryButtons({
  categoryData,
  onClickSelect,
}: {
  categoryData: CategoryDataType[];
  onClickSelect: (idx: number, checked?: boolean) => void;
}) {
  return (
    <CategoryButtonsWrapper>
      <ul>
        {categoryData.map((val: CategoryDataType, idx: number) => {
          const { id, name, checked } = val;

          return (
            <li key={id} className={checked ? "select" : ""}>
              <button
                type="button"
                onClick={() => {
                  onClickSelect(idx, checked);
                }}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </CategoryButtonsWrapper>
  );
}
