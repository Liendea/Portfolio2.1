import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "../styles/main.scss";
import localFont from "next/font/local";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const getaiGrotesk = localFont({
  src: "../fonts/DTGetaiGroteskDisplay-Black.woff2",
  variable: "--font-getai-grotesk-display",
  display: "swap",
});

const PPPangram = localFont({
  src: [
    {
      path: "../fonts/PPPangramSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPPangramSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/PPPangramSans-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pppangram",
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
        className={`${schibstedGrotesk.variable} ${PPPangram.variable} ${getaiGrotesk.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
