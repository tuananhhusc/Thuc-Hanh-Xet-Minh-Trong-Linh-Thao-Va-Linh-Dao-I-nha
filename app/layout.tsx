import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thực Hành Xét Mình Trong Linh Thao Và Linh Đạo I-nhã",
  description:
    "Báo cáo nghiên cứu chuyên sâu về phương pháp Xét Mình (Examen) trong Linh Thao của Thánh Inhaxiô Loyola — từ nền tảng thần học, cấu trúc phương pháp luận đến ứng dụng trong đời sống hiện đại.",
  keywords: [
    "Linh Thao",
    "Linh đạo I-nhã",
    "Xét Mình",
    "Phút Hồi Tâm",
    "Thánh Inhaxiô Loyola",
    "Cầu nguyện chiêm niệm",
    "Dòng Tên",
    "Phân định thần loại",
    "Examen",
    "Ignatian Spirituality"
  ],
  authors: [{ name: "Chuyên gia Kỹ sư Frontend & Nhà thiết kế UI/UX" }],
  openGraph: {
    title: "Thực Hành Xét Mình Trong Linh Thao Và Linh Đạo I-nhã",
    description:
      "Báo cáo nghiên cứu chuyên sâu về phương pháp Xét Mình (Examen) trong Linh Thao của Thánh Inhaxiô Loyola — từ nền tảng thần học, cấu trúc phương pháp luận đến ứng dụng trong đời sống hiện đại.",
    url: "https://linh-thao-examen.vercel.app",
    siteName: "Linh Đạo I-nhã - Thực Hành Xét Mình",
    locale: "vi_VN",
    type: "article",
    publishedTime: "2026-07-05T00:00:00.000Z",
    authors: ["Thánh Inhaxiô Loyola", "Dòng Tên"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thực Hành Xét Mình Trong Linh Thao Và Linh Đạo I-nhã",
    description:
      "Báo cáo nghiên cứu chuyên sâu về phương pháp Xét Mình (Examen) trong Linh Thao của Thánh Inhaxiô Loyola — từ nền tảng thần học, cấu trúc phương pháp luận đến ứng dụng trong đời sống hiện đại.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ReadingProvider } from "./context/ReadingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${lora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <ReadingProvider>
          {children}
        </ReadingProvider>
      </body>
    </html>
  );
}
