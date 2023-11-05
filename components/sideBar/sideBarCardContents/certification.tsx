import { useState } from "react";

import CategoryButtons from "@/components/categoryButtons";
import { usePathname } from "next/navigation";

export default function Certification() {
  const pathname = usePathname();
  const [certificationArr, setCertification] = useState<any>([
    { category: "Exempt", checked: false },
    { category: "ALL", checked: false },
    { category: "7", checked: false },
    { category: "12", checked: false },
    { category: "15", checked: false },
    { category: "19", checked: false },
  ]);

  const onClickSelect = (idx: number, checked: boolean) => {
    const copy = [...certificationArr];
    copy[idx].checked = !checked;
    setCertification(copy);
  };

  return (
    <div className="cardContent">
      <div>Certification</div>
      {pathname === "/tv" && (
        <CategoryButtons
          categoryData={certificationArr}
          onClickSelect={onClickSelect}
        />
      )}
    </div>
  );
}
