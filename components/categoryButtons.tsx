import { CategoryButtonsWrapper } from "@/styles/components/sideBar/sideBarCardContents/categoryButtonsWrapper";

export default function CategoryButtons({ categoryData, onClickSelect }: any) {
  return (
    <CategoryButtonsWrapper>
      <ul>
        {categoryData.map((val: any, idx: number) => {
          const { category, checked } = val;

          return (
            <li key={`${category}${idx}`} className={checked ? "select" : ""}>
              <div
                onClick={() => {
                  onClickSelect(idx, checked);
                }}
              >
                {category}
              </div>
            </li>
          );
        })}
      </ul>
    </CategoryButtonsWrapper>
  );
}
