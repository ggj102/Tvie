import { useState } from "react";

import CategoryButtons, {
  CategoryDataType,
} from "@/components/categoryButtons";
import { usePathname } from "next/navigation";

export default function Certification() {
  const pathname = usePathname();
  const [certificationArr, setCertification] = useState<CategoryDataType[]>([
    { id: 1, name: "Exempt", checked: false },
    { id: 0, name: "ALL", checked: false },
    { id: 7, name: "7", checked: false },
    { id: 12, name: "12", checked: false },
    { id: 15, name: "15", checked: false },
    { id: 19, name: "19", checked: false },
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
