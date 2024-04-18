"use client";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Header from "../components/header";
import "./globals.scss";
import { getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getCookie("token"));
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header token={token} />
        {children}
      </body>
    </html>
  );
}
