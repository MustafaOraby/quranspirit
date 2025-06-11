import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "روح القرآن",
  description: "منصة متكاملة للاستماع إلى القرآن الكريم والأذكار",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="ltr">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
        <ScrollToTop />
      </body>
    </html>
  );
}
