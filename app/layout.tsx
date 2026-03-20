import type { Metadata } from "next";
import "reveal.js/reveal.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sunnypark87.github.io"),
  title: {
    default: "2026 Keeper Mentoring",
    template: "%s | 2026 Keeper Mentoring",
  },
  description: "Keeper 멘토링을 위한 주차별 정적 슬라이드 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
