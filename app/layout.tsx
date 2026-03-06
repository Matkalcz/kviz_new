import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kviz New - Nový hospodský kvíz",
  description: "Moderní systém pro hospodské kvízy s automatickým řízením",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}