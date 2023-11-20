import { useState, ReactNode } from "react";
import { SideBarCardWrapper } from "@/styles/components/sideBar/sideBarCardWrapper";

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
    <SideBarCardWrapper className="card">
      <button className="cardTitle" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div>{children}</div>}
    </SideBarCardWrapper>
  );
}
