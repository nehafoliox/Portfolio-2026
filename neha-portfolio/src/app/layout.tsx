import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neha — UI/Product Designer | Ahmedabad",
  description:
    "Portfolio of Neha — a UI/Product Designer based in Ahmedabad, India. Crafting beautiful, functional digital experiences.",
  keywords: [
    "UI Designer",
    "Product Designer",
    "Portfolio",
    "Ahmedabad",
    "India",
    "Figma",
    "UX",
  ],
  openGraph: {
    title: "Neha — UI/Product Designer",
    description:
      "Crafting beautiful, functional digital experiences from Ahmedabad, India.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hostGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
