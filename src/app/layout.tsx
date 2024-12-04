import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './GlobalRedux/Provider';
import { store } from './GlobalRedux/store';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Movie Match",
  description: "By Sebastian Barrientos Programador FullStack",
};

export default function RootLayout({ children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Providers >
          {children}
        </Providers>
      </body>
    </html>
  );
}
