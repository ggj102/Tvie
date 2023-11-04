import { useState } from "react";
import { SideBarCardWrapper } from "@/styles/components/sideBar/sideBarCardWrapper";

export default function SideBarCard({
  title,
  children,
  defaultOpen,
}: {
  title: string;
  defaultOpen: boolean;
  children: any;
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
