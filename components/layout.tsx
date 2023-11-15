"use client";

import { LayoutWrapper } from "@/styles/components/layoutWrapper";

export default function Layout({ children }: any) {
  return (
    <LayoutWrapper>
      {children}
      <footer></footer>
    </LayoutWrapper>
  );
}
