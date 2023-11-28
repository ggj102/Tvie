import genreButtonsStyles from "@styles/pages/contents/filterBar/filterItems/genreButtons.module.scss";

export type CategoryDataType = {
  id: number;
  name: string;
  checked?: boolean;
};

export default function GenreButtons({
  categoryData,
  onClickSelect,
}: {
  categoryData: CategoryDataType[];
  onClickSelect: (idx: number, checked?: boolean) => void;
}) {
  return (
    <ul className={genreButtonsStyles.genre_buttons}>
      {categoryData.map((val: CategoryDataType, idx: number) => {
        const { id, name, checked } = val;

        return (
          <li key={id} className={checked ? genreButtonsStyles.select : ""}>
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
  );
}
