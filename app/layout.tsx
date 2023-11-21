import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/common/navigation";
import Layout from "@/components/common/rootLayout";

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
