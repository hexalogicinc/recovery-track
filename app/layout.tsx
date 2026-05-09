import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { BrandBar } from "@/components/brand-bar";
import { BRAND } from "@/lib/branding";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: BRAND.fullName,
  description: BRAND.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.12),transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.06),transparent_50%),hsl(222_47%_6%)] font-sans">
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-10 pt-6">
          <BrandBar />
          {children}
        </div>
      </body>
    </html>
  );
}
