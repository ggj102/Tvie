import type { Metadata } from "next";
import "./globals.css";

import Layout from "@/components/rootLayout";
import Navigation from "@/components/navigation";

export const metadata: Metadata = {
  title: "TVie",
  description: "TV, Movie search",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
