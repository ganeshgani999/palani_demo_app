import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavigationBar } from "@/components/navigation-bar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.martbridge.com"),
  title: "MartBridge — Connecting Stores to Supply | B2B Retail Platform",
  description:
    "MartBridge connects local retail stores in Andhra Pradesh to a trusted supplier and distribution network. Quality products, competitive prices, dependable delivery.",
  openGraph: {
    title: "MartBridge — Connecting Stores to Supply",
    description:
      "B2B retail supply platform for local retail stores in Andhra Pradesh, India.",
    url: "https://www.martbridge.com",
    siteName: "MartBridge",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
