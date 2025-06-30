"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [address, setAddress] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("mediConnectAddress") || ""
      : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveAddress = (addr: string) => {
    localStorage.setItem("mediConnectAddress", addr);
    setAddress(addr);
    alert("Address saved!");
  };

  const handleSaveAddress = () => {
    if (!address.trim()) {
      alert("Please enter an address first.");
      return;
    }
    saveAddress(address);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setError(null);
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            { headers: { "User-Agent": "MediConnectDigital/1.0" } }
          );
          const data = await resp.json();
          if (data.display_name) {
            saveAddress(data.display_name);
          } else {
            setError("Could not determine address from your location.");
          }
        } catch {
          setError("Reverse geocoding failed.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

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
            disabled={loading}
          />
          <button
            className={styles.SaveButton}
            onClick={handleSaveAddress}
            disabled={loading}
          >
            <h1>Save</h1>
          </button>
        </div>
        <h1>Enter in any address and press save to try it out! Or...</h1>
        <div className={styles.CurrentLocationButton}>
          <button
            className={styles.SaveButton}
            onClick={handleUseMyLocation}
            disabled={loading}
          >
            <h1>{loading ? "Locating…" : "Use Current Location"}</h1>
          </button>
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}

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
