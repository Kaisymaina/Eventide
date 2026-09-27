import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const artisticFont = Cinzel_Decorative({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-artistic",
});

export const metadata: Metadata = {
  title: "Eventide | Live Event & Vending Management Platform",
  description: "Discover live concerts, tech summits, food expos, and vendor booth opportunities across East Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${artisticFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
