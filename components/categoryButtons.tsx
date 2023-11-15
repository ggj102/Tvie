import { CategoryButtonsWrapper } from "@/styles/components/sideBar/sideBarCardContents/categoryButtonsWrapper";

export default function CategoryButtons({ categoryData, onClickSelect }: any) {
  return (
    <CategoryButtonsWrapper>
      <ul>
        {categoryData.map((val: any, idx: number) => {
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
