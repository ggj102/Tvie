import { useEffect } from "react";
import { CategoryButtonsWrapper } from "@/styles/components/sideBar/sideBarCardContents/categoryButtonsWrapper";

type CategoryDataType = {
  id: number;
  name: string;
  checked?: boolean;
};

export default function CategoryButtons({
  categoryData,
  onClickSelect,
}: {
  categoryData: CategoryDataType[];
  onClickSelect: any;
}) {
  useEffect(() => {
    console.log(categoryData);
    console.log(onClickSelect);
  }, [categoryData, onClickSelect]);

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
