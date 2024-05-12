import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pocket-FM Player",
  description: "Play Audio/Video Files with custom player",
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
 