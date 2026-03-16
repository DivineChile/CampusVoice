import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomToaster } from "@/components/ui/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | CampusVoice",
    default: "CampusVoice"
  },
  description: " A secure, anonymous platform empowering students to shape the future of their institutions.",
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
        {children}
        <CustomToaster/>
      </body>
    </html>
  );
}
