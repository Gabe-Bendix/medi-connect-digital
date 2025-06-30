"use client"

import { useState } from "react"
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [address, setAddress] = useState("")

  const handleSaveAddress = () => {
    if (!address.trim()) {
      alert("Please enter an address first.")
      return
    }
    localStorage.setItem("mediConnectAddress", address)
    alert("Address saved!")
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.TextBox}>
        <h2>Welcome to Medi Connect!</h2>
        <h1>
          We can help you find foreign medicinal equivalents, nearby pharmacies,
          and communicate with pharmacy workers.
        </h1>
        <h1>Navigate between the tools using the navigation bar below!</h1>
      </div>

      <div className={styles.TextBox}>
        <h2>But wait! We need one thing!</h2>
        <h1>To find local equivalents and pharmacies we need a location. </h1>

        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.input}
            placeholder="Hardenbergstraße 16-18, 10623 Berlin, Germany..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className={styles.SaveButton}
            onClick={handleSaveAddress}
          >
            <h1>Save</h1>
          </button>
        </div>

        <h1>
          Enter in any address and press save to try it out!
        </h1>
      </div>

      <div className={styles.TextBoxWithButton}>
        <div className={styles.Text}>
          <h2>Learn about this product's story!</h2>
          <h1>
            This site was developed in Berlin, Gainesville, and São Paulo.
          </h1>
        </div>
        <Link href="/about" className={styles.AboutButton}>
          <h2>Learn more</h2>
        </Link>
      </div>
    </div>
  );
}

