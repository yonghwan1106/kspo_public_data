import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitAge - 피트에이지 | 나의 체력나이는?",
  description:
    "국민체력측정 빅데이터 기반으로 나의 피트에이지(체력나이)를 측정하고, 동일 연령대 대비 체력 수준을 확인하세요. 맞춤형 운동처방까지 한번에!",
  keywords: [
    "피트에이지",
    "체력나이",
    "국민체력100",
    "체력측정",
    "운동처방",
    "국민체육진흥공단",
  ],
  authors: [{ name: "FitAge Team" }],
  openGraph: {
    title: "FitAge - 피트에이지 | 나의 체력나이는?",
    description:
      "국민체력측정 빅데이터 기반 체력나이 측정 서비스",
    type: "website",
    locale: "ko_KR",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
