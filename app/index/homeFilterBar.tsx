export default function HomeFilterBar({ filter, currentTab, onClick }: any) {
  const tabConnect: any = {
    day: "오늘",
    week: "이번 주",
  };

  return (
    <div className="homeFilterBar">
      {filter &&
        filter.map((val: string, idx: number) => {
          return (
            <button
              key={`${val}${idx}`}
              className={currentTab === val ? "currentTab" : ""}
              onClick={() => onClick(val)}
            >
              <div>{tabConnect[val]}</div>
            </button>
          );
        })}
    </div>
  );
}
