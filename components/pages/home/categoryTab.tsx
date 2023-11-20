import categoryTabStyles from "@styles/pages/home/categoryTab.module.scss";

type TabData = {
  name: string;
  type: string;
};

export default function CategoryTab({
  tabData,
  currentTab,
  onClick,
}: {
  tabData: TabData[];
  currentTab: string;
  onClick: any;
}) {
  return (
    <div className={categoryTabStyles.category_tab}>
      {tabData.map((val: TabData) => {
        const { name, type } = val;

        return (
          <button
            key={type}
            className={currentTab === type ? categoryTabStyles.current_tab : ""}
            onClick={() => onClick(type)}
          >
            <div>{name}</div>
          </button>
        );
      })}
    </div>
  );
}
