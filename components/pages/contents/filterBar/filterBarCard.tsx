import { useState, ReactNode } from "react";
import filterBarCardStyles from "@styles/pages/contents/filterBar/filterBarCard.module.scss";

export default function FilterBarCard({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  defaultOpen: boolean;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div className={filterBarCardStyles.filter_bar_card}>
      <button
        className={filterBarCardStyles.title}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && children}
    </div>
  );
}
