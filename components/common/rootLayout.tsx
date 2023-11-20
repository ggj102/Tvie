"use client";
import { useState } from "react";
import { GlobalContext } from "@/app/context";

import Loading from "./loading";

import styles from "../../styles/common/rootLayout.module.scss";

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
      <div className={styles.root_layout}>
        <Loading />
        <div className={styles.children}>
          <div>{children}</div>
        </div>
        <footer></footer>
      </div>
    </GlobalContext.Provider>
  );
}
