"use client";
import { ThemeProvider } from "./exports";
import Header from "./components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });

        const content = await response.json();

        setMessage(`Hi, ${content.name}`);
        setAuth(true);
      } catch (error) {
        setMessage("You are not logged in");
        setAuth(false);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <NextAuthProvider auth={auth}>
            <Header />
            {children}
          </NextAuthProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
