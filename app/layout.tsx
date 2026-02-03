import type { Metadata } from "next";
import { Arimo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["200"],
});

export const metadata: Metadata = {
  title: "ELEMENTA",
  description: "Experience exceptional fine dining at ELEMENTA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${arimo.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
