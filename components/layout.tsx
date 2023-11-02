"use client";

import { LayoutWrapper } from "@/styles/components/layoutWrapper";

export default function Layout({ children }: any) {
  return (
    <LayoutWrapper>
      <div>
        <div>{children}</div>
      </div>
      <footer></footer>
    </LayoutWrapper>
  );
}
