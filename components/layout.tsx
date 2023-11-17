"use client";
import { useState } from "react";
import { GlobalContext } from "@/app/context";

import Loading from "./loading";

import { LayoutWrapper } from "@/styles/components/layoutWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <GlobalContext.Provider value={value}>
      <LayoutWrapper>
        <Loading />
        {children}
        <footer></footer>
      </LayoutWrapper>
    </GlobalContext.Provider>
  );
}
