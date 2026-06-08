import type { Metadata } from "next";
import "./globals.css";

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
