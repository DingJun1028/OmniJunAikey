import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JunAiKey - OmniSystem",
  description: "Entering the Terminus Matrix",
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
