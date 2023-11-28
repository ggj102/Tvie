"use client";
import { useState } from "react";
import { GlobalContext } from "@/app/context";

import rootLayoutStyles from "@styles/common/rootLayout.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const value = {
    isLoading,
    setIsLoading,
  };

  return (
    <GlobalContext.Provider value={value}>
      <div className={rootLayoutStyles.root_layout}>
        {children}
        <footer></footer>
      </div>
    </GlobalContext.Provider>
  );
}
