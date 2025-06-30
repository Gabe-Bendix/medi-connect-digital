"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import styles from "./page.module.css";

// 1) Recenter now also captures the map instance
function Recenter({
  lat,
  lng,
  mapRef,
}: {
  lat: number;
  lng: number;
  mapRef: React.MutableRefObject<any>;
}) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map; // capture map instance
    map.setView([lat, lng], 14); // recenter
  }, [lat, lng, map, mapRef]);
  return null;
}

export default function LocatePage() {
  const [address, setAddress] = useState<string | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [pharmaPos, setPharmaPos] = useState<[number, number] | null>(null);
  const [pharmaName, setPharmaName] = useState<string | null>(null);
  const [pharmaAddress, setPharmaAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mapRef = useRef<any>(null);

  // 1) Load saved address
  useEffect(() => {
    const saved = localStorage.getItem("mediConnectAddress");
    if (!saved) {
      setError("⚠️ Please save an address on the Home page first.");
    }
    setAddress(saved);
  }, []);

  // 2) Geocode via Nominatim
  useEffect(() => {
    if (!address) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1`,
      { headers: { "User-Agent": "MediConnectDigital/1.0" } }
    )
      .then((r) => r.json())
      .then((data: { lat: string; lon: string }[]) => {
        if (data.length === 0) {
          setError("⚠️ Could not geocode that address.");
          return;
        }
        const { lat, lon } = data[0];
        setUserPos([parseFloat(lat), parseFloat(lon)]);
      })
      .catch(() => setError("⚠️ Geocoding failed."));
  }, [address]);

  // 3) Query Overpass for nearby pharmacies
  useEffect(() => {
    if (!userPos) return;
    const [lat, lon] = userPos;

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="pharmacy"](around:5000,${lat},${lon});
        way["amenity"="pharmacy"](around:5000,${lat},${lon});
      );
      out center;
    `;
    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "MediConnectDigital/1.0",
      },
      body: new URLSearchParams({ data: query }),
    })
      .then((r) => r.json())
      .then((data: any) => {
        const elems = data.elements;
        if (!elems || elems.length === 0) {
          setError("⚠️ No pharmacies found nearby.");
          return;
        }

        // Haversine distance
        const toRad = (d: number) => (d * Math.PI) / 180;
        function dist(a: [number, number], b: [number, number]) {
          const R = 6371e3;
          const φ1 = toRad(a[0]),
            φ2 = toRad(b[0]);
          const Δφ = toRad(b[0] - a[0]),
            Δλ = toRad(b[1] - a[1]);
          const x =
            Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
          const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
          return R * c;
        }

        // Typing for best
        type PharmacyBest = {
          coord: [number, number];
          tags: any;
        };
        let best: PharmacyBest | null = null;

        // for…of so TS can narrow best
        for (const el of elems as any[]) {
          const coord: [number, number] = el.lat
            ? [el.lat, el.lon]
            : [el.center.lat, el.center.lon];
          if (!best || dist(userPos, coord) < dist(userPos, best.coord)) {
            best = { coord, tags: el.tags };
          }
        }

        if (best) {
          setPharmaPos(best.coord);
          setPharmaName(best.tags.name || "Unnamed Pharmacy");

          // reconstruct address
          const parts: string[] = [];
          if (best.tags["addr:housenumber"])
            parts.push(best.tags["addr:housenumber"]);
          if (best.tags["addr:street"]) parts.push(best.tags["addr:street"]);
          if (best.tags["addr:city"]) parts.push(best.tags["addr:city"]);
          if (best.tags["addr:postcode"])
            parts.push(best.tags["addr:postcode"]);
          setPharmaAddress(parts.join(", "));
        }
      })
      .catch(() => setError("⚠️ Pharmacy lookup failed."));
  }, [userPos]);

  if (error) {
    return <div className={styles.warning}>{error}</div>;
  }
  if (!userPos || !pharmaPos) {
    return <div className={styles.warning}>Loading map…</div>;
  }

  return (
    <div className={styles.MainContainer}>
      {/* Map box */}
      <div className={styles.MapBox}>
        <MapContainer
          center={userPos}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <Recenter lat={userPos[0]} lng={userPos[1]} mapRef={mapRef} />

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={userPos}>
            <Popup>You are here</Popup>
          </Marker>

          <Marker position={pharmaPos}>
            <Popup>{pharmaName}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Pharmacy info box */}
      <div className={styles.InfoBox}>
        <p className={styles.pharmaLabel}>Closest open pharmacy is:</p>
        <h2 className={styles.infoTitle}>{pharmaName}</h2>
        <p className={styles.infoText}>
          {pharmaAddress ||
            `${pharmaPos[0].toFixed(5)}, ${pharmaPos[1].toFixed(5)}`}
        </p>
      </div>
    </div>
  );
}
