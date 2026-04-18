import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { MainLayout } from "@/components/templates/MainLayout";
import { InitialDataLoader } from "@/components/InitialDataLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inosoft Inspection App",
  description: "Manage your inspections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <InitialDataLoader />
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
