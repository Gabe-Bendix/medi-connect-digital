// src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";
import Aurora from "../components/Backgrounds/Aurora/Aurora";
import Image from 'next/image';


export const metadata: Metadata = {
  title: "MediConnectDigital",
  description: "Navigate foreign healthcare environments with confidence",
  icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
        <div className={styles.container}>
          











          {/* 1) Header */}
          <header className={styles.header}>
            <div className={styles.LogoTitleMoto}>
              <Image
                src="/images/MDlogo_White.png"
                alt="Medi Connect Digital Logo"
                width={40}    // change to your desired display width
                height={40}   // change to your desired display height
                className={styles.logo}
                />
            <div className={styles.TitleMoto}>


              <h3>Medi Connect Digital</h3>
              <h2>To navigate healthcare abroad</h2>
          </div>
              </div>
            <h1>This application is for demonstration purposes and not for medical advice. Always consult a healthcare professional before making any decisions.</h1>
          </header>











          {/* 2) Main content area */}
          <main className={styles.main}>{children}</main>




          {/* 3) Navigation bar */}
          <nav className={styles.navbar}>
            <Link href="/search">
              
              <div className={styles.navItem}>
                <Image
                src="/images/searchIcon.png"
                alt="search icon"
                width={40}
                height={40}
                />
                <h2>Search</h2>
              </div>
            </Link>
            <Link href="/">
              
              <div className={styles.navItem}>
                <Image
                src="/images/homeIcon.png"
                alt="home icon"
                width={40}
                height={40}
                />
                <h2>Home</h2>
              </div>
            </Link>
            <Link href="/locate">
              <div className={styles.navItem}>
                <Image
                src="/images/locateIcon.png"
                alt="locate icon"
                width={30}
                height={40}
                />
                <h2>Locate</h2>
              </div>
            </Link>
          </nav>

        
        
        </div>
      </body>
    </html>
  );
}
