import homeTitleBarStyles from "@styles/pages/home/homeTitleBar.module.scss";

type TabData = {
  name: string;
  type: string;
};

export default function HomeTitleBar({
  title,
  tabData,
  currentTab,
  onClick,
}: {
  title: string;
  tabData: TabData[];
  currentTab: string;
  onClick: (type: string) => void;
}) {
  return (
    <div className={homeTitleBarStyles.title}>
      <h2>{title}</h2>
      <div className={homeTitleBarStyles.category_tab}>
        {tabData.map((val: TabData) => {
          const { name, type } = val;

          return (
            <button
              key={type}
              className={
                currentTab === type ? homeTitleBarStyles.current_tab : ""
              }
              onClick={() => onClick(type)}
            >
              <div>{name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
