import { useState } from "react";

import CategoryButtons from "@/components/categoryButtons";
import { usePathname } from "next/navigation";

export default function Certification({ setValue }: any) {
  const pathname = usePathname();
  const [certificationArr, setCertification] = useState<any>([
    { id: "Exempt", name: "Exempt", checked: false },
    { id: "ALL", name: "ALL", checked: false },
    { id: "7", name: "7", checked: false },
    { id: "12", name: "12", checked: false },
    { id: "15", name: "15", checked: false },
    { id: "19", name: "19", checked: false },
  ]);

  const onClickSelect = (idx: number, checked: boolean) => {
    const copy = [...certificationArr];
    copy[idx].checked = !checked;

    setValue("certification", copy, { shouldDirty: true });
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
