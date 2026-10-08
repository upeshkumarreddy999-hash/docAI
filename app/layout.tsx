import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocAI",
  description: "AI-Powered Document Management & Q&A Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}