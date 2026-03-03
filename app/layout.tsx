// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "sonner";
import NavPage from "../components/nav/navPage";
import Providers from "../components/providers/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nano Restaurant",
  description: "Best restaurant in town",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-row w-full justify-center">
        <Providers>
          <NavPage />
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
