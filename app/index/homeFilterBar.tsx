export default function HomeFilterBar({ tabData, currentTab, onClick }: any) {
  return (
    <div className="homeFilterBar">
      {tabData.map((val: any) => {
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
