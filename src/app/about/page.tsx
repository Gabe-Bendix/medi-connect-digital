// src/app/about/page.tsx
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.TextBox}>
        <h2>From Design to Digital</h2>

<div className={styles.photo}>
        <Image
          src="/images/MediConnectPic.png"
          alt="Medi Connect Pitch Photo"
          width={200} // change to your desired display width
          height={100} // change to your desired display height
          // className={styles.photo}
          />
          </div>

        <h1>
          Medi Connect Digital began as a capstone in UF’s Berlin
          Entrepreneurship & Innovation program at TU Berlin. Under Prof.
          Sander’s mentorship, our team prototyped a travel‐health companion and
          won first place for highest valuation.
        </h1>

        <h1>
          Today, we merge that entrepreneurial spirit with three core features:
          Multilingual medication‐equivalent search, Real‐time pharmacy locator,
          AI‐driven symptom translation
        </h1>

        <h1>
          We’re grateful to UF and TU Berlin for the journey, and excited to
          keep refining Medi Connect Digital into the best travel‐health
          companion.
        </h1>
      </div>

      <div className={styles.TextBoxWithButton}>
        <h2>Original Project Post</h2>
        <Link
          href="https://www.linkedin.com/posts/gabriel-bendix_i-am-overjoyed-to-announce-that-this-past-activity-7237300871238221824--ECA"
          className={styles.PostButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on LinkedIn
        </Link>
      </div>
    </div>
  );
}
