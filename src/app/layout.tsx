// src/app/layout.tsx
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
          











          {/* Header */}
          <header className={styles.header}>
            <div className={styles.LogoTitleMoto}>
            <Image
              src="/images/MDlogo_White.png"
              alt="Medi Connect Digital Logo"
              width={60}    // change to your desired display width
              height={50}   // change to your desired display height
              />
            <div className={styles.TitleMoto}>


              <h3 className={styles.title}>Medi Connect Digital</h3>
              <h2 className={styles.motto}>To help you navigate healthcare abroad</h2>
          </div>
              </div>
            <h1 className={styles.warning}>This application is for demonstration purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before making any treatment decisions.</h1>
          </header>












          <main className={styles.main}>{children}</main>

          <nav className={styles.navbar}>
            <Link href="/search">
              <div className={styles.navItem}>Search</div>
            </Link>
            <Link href="/">
              <div className={styles.navItem}>Home</div>
            </Link>
            <Link href="/locate">
              <div className={styles.navItem}>Locate</div>
            </Link>
          </nav>

        
        
        </div>
      </body>
    </html>
  );
}
