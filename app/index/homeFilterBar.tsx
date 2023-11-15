type TabData = {
  name: string;
  type: string;
};

export default function HomeFilterBar({
  tabData,
  currentTab,
  onClick,
}: {
  tabData: TabData[];
  currentTab: string;
  onClick: any;
}) {
  return (
    <div className="homeFilterBar">
      {tabData.map((val: TabData) => {
        const { name, type } = val;

        return (
          <button
            key={type}
            className={currentTab === type ? "currentTab" : ""}
            onClick={() => onClick(type)}
          >
            <div>{name}</div>
          </button>
        );
      })}
    </div>
  );
}
