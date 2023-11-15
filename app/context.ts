"use client";

import { createContext, Dispatch, SetStateAction } from "react";

interface ContextType {
  isLoading: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextType>({
  isLoading: false,
  setIsLoading: () => {},
});
