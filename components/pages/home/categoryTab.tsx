import styles from "../../../styles/pages/home/categoryTab.module.scss";

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
    <div className={styles.category_tab}>
      {tabData.map((val: TabData) => {
        const { name, type } = val;

        return (
          <button
            key={type}
            className={currentTab === type ? styles.current_tab : ""}
            onClick={() => onClick(type)}
          >
            <div>{name}</div>
          </button>
        );
      })}
    </div>
  );
}
