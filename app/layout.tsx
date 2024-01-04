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
  let isSession = !!userData;

  if (!userData?.user_metadata?.favorites && isSession) {
    await initUser(userData);
  }

  return { isSession };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSession } = await ServerSideProps();

  return (
    <html lang="en">
      <UserProvider>
        <body>
          <StoreProvider>
            <MainLayout>
              <Navigation isSession={isSession} />
              {children}
            </MainLayout>
          </StoreProvider>
        </body>
      </UserProvider>
    </html>
  );
}
