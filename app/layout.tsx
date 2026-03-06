// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "sonner";

import FooterPage from "../components/general/footer/footerPage";
import NavPage from "../components/general/nav/navPage";
import Providers from "../components/providers/providers";
import { CartProvider } from "./context/CartContext";
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
      <body className='flex flex-col min-h-screen  bg-gray-900 overflow-x-hidden'>
        <Providers>
          <CartProvider>
            <NavPage />
            {children}
            <FooterPage />
          </CartProvider>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
