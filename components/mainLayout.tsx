"use client";

import mainLayoutStyles from "@styles/common/mainLayout.module.scss";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={mainLayoutStyles.main_layout}>
      {children}
      <footer></footer>
    </div>
  );
}
