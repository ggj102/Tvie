"use client";

import { LayoutWrapper } from "@/styles/components/layoutWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutWrapper>
      {children}
      <footer></footer>
    </LayoutWrapper>
  );
}
