"use client";
import { Inter } from "next/font/google";
import Header from "../components/header";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="true">
        <Header />
        {children}
      </body>
    </html>
  );
}
