import { KeyboardEvent, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

export default function useNavigation() {
  const router = useRouter();
  const pathName = usePathname();

  const [inputValue, setInputValue] = useState<string>("");
  const [returnToPath, setReturnToPath] = useState<string>("");

  const onClickSearch = () => {
    router.push(`/searchResults?search=${inputValue}`);
  };

  const onKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/searchResults?search=${inputValue}`);
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const search = window.location.search;
    const path = encodeURIComponent(`${pathname}${search}`);

    setReturnToPath(path);
  }, [pathName]);

  return {
    returnToPath,
    inputValue,
    setInputValue,
    onKeyDownSearch,
    onClickSearch,
  };
}
