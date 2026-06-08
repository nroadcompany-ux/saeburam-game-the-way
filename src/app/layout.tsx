import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "THE WAY | 하나님의 길",
  description: "성경을 기반으로 하나님의 길을 탐험하는 성경 게임",
  keywords: ["성경", "Bible", "게임", "game", "하나님의 길", "THE WAY"],
  openGraph: {
    title: "THE WAY | 하나님의 길",
    description: "성경을 기반으로 하나님의 길을 탐험하는 성경 게임",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-way min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
