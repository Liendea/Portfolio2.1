import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "@/src/styles/main.scss";
import localFont from "next/font/local";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getaiGrotesk = localFont({
  src: "../fonts/DTGetaiGroteskDisplay-Black.woff2",
  variable: "--font-getai-grotesk-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linda's Portfolio",
  description: "portfolio 2.1",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${geistMono.variable} ${getaiGrotesk.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
