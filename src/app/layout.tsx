import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Source_Code_Pro } from "next/font/google";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jet-brains-mono",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-soucre-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jorinex",
  description: "Enhace your text communication with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="m-0 p-0">
        <body
          className={`${sourceCodePro.variable} ${jetBrainsMono.variable} overflow-hidden m-0 p-0`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
