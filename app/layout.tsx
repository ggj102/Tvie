import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { getManagementUser, initUser } from "../api/authZero";

import "./globals.css";

import Navigation from "@/components/navigation";
import MainLayout from "@/components/mainLayout";

import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "TVie",
  description: "TV, Movie search",
};

async function ServerSideProps() {
  const userData = await getManagementUser();
  let initData = userData;

  if (!userData?.user_metadata.favorites && userData) {
    initData = await initUser(userData);
  }

  let sessionState = !!userData;

  return { initData, sessionState };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initData, sessionState } = await ServerSideProps();

  return (
    <html lang="en">
      <UserProvider>
        <body>
          <StoreProvider>
            <MainLayout>
              <Navigation sessionState={sessionState} />
              {children}
            </MainLayout>
          </StoreProvider>
        </body>
      </UserProvider>
    </html>
  );
}
