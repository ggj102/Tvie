import { KeyboardEvent, useState } from "react";

import { useRouter } from "next/navigation";

export default function useHomeSearchBar() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const onClickSearch = () => {
    router.push(`/searchResults?search=${inputValue}`);
  };

  const onKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/searchResults?search=${inputValue}`);
    }
  };

  return {
    inputValue,
    setInputValue,
    onKeyDownSearch,
    onClickSearch,
  };
}
