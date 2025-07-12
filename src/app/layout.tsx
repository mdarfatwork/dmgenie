import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DM Genie - AI-Powered LinkedIn Message Generator",
  description:
    "DM Genie helps job seekers generate personalized LinkedIn messages using AI. Upload your resume, add a job, and start reaching out with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <div className="absolute inset-0 -z-10 h-full w-full bg-white">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/4 rounded-full bg-[#9798ff] opacity-40 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#9798ff] opacity-30 blur-[120px]" />
        </div>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
