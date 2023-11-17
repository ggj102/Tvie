import { createContext, Dispatch, SetStateAction } from "react";

interface ContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextType>({
  isLoading: true,
  setIsLoading: () => {},
});
