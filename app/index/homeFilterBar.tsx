import { useEffect, useState } from "react";

export default function HomeFilterBar({ filter }: any) {
  const [currentTab, setCurrentTab] = useState<string>();

  const onClickTab = (val: string) => {
    setCurrentTab(val);
  };

  useEffect(() => {
    setCurrentTab(filter[0]);
  }, [filter]);

  return (
    <div className="homeFilterBar">
      {filter &&
        filter.map((val: string, idx: number) => {
          return (
            <button
              key={`${val}${idx}`}
              className={currentTab === val ? "currentTab" : ""}
              onClick={() => onClickTab(val)}
            >
              <div> {val}</div>
            </button>
          );
        })}
    </div>
  );
}
