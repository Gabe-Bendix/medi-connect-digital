// src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";
import Aurora from "../components/Backgrounds/Aurora/Aurora";
import Image from "next/image";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediConnectDigital",
  description: "Navigate foreign healthcare environments with confidence",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body>
        {/* 1) Background layer */}
        <div className={styles.background}>
          <Aurora
            colorStops={["#00EAFF", "#0009FF", "#B361FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* 2) Main content container */}
        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <div className={styles.HeaderAndMain}>
              {/* 1) Header */}
              <div className={styles.header}>
                <div className={styles.LogoTitleMoto}>
                  <Image
                    src="/images/logoFavicon.png"
                    alt="Medi Connect Digital Logo"
                    width={40} // change to your desired display width
                    height={40} // change to your desired display height
                    className={styles.logo}
                  />
                  <div className={styles.TitleMoto}>
                    <h3>Medi Connect Digital</h3>
                    <h2>To navigate healthcare abroad</h2>
                  </div>
                </div>
                <h1>
                  This application is for demonstration purposes only and not
                  for medical advice. Always consult a doctor when making
                  decisions.
                </h1>
              </div>

              {/* 2) Main content area */}
              {children}
            </div>

            {/* 3) Navigation bar */}
            <div className={styles.NavBar}>
              <Link href="/search" className={styles.NavItem}>
                <Image
                  src="/images/searchIcon.png"
                  alt="search icon"
                  width={30}
                  height={30}
                />
                <h2>Search</h2>
              </Link>

              <Link href="/" className={styles.NavItem}>
                <Image
                  src="/images/homeIcon.png"
                  alt="home icon"
                  width={30}
                  height={30}
                />
                <h2>Home</h2>
              </Link>

              <Link href="/locate" className={styles.NavItem}>
                <Image
                  src="/images/locateIcon.png"
                  alt="locate icon"
                  width={25}
                  height={30}
                />
                <h2>Locate</h2>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
