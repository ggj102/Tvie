import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/styleRegistry";
import "./globals.css";
import Navigation from "@/components/common/navigation";
import Layout from "@/components/layout";

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
        <StyledComponentsRegistry>
          <Navigation />
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
