import React, { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Data
import { aplikasiDkpp } from "@/utils/constant/aplikasiDkpp";

// Components
import AppCard from "@/components/molecules/AppCard";
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));

export default function AplikasiDKPP({ BASE_URL_API_V2_CLIENT }) {
  const [query, setQuery] = useState("");

  const filtered = aplikasiDkpp.filter((app) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return app.searchTags.includes(q) || app.name.toLowerCase().includes(q);
  });

  return (
    <>
      <Head>
        <title>Aplikasi DKPP — SIMAWAS PAGI</title>
        <meta
          name="description"
          content="Kumpulan aplikasi dan layanan digital dari Dinas Ketahanan Pangan dan Peternakan Provinsi Jawa Barat."
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />

      <main style={{ fontFamily: "'Inter', sans-serif", color: "#1E2A22", background: "#FBFCFA" }}>

        {/* ── HERO ── */}
        <section className="dkpp-hero">
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#E4F1E4",
              color: "#0F6B37",
              fontWeight: 700,
              fontSize: "12.5px",
              letterSpacing: ".4px",
              padding: "7px 16px",
              borderRadius: "999px",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#F5A623",
                display: "inline-block",
              }}
            />
            EKOSISTEM DIGITAL DKPP JAWA BARAT
          </div>

          {/* Judul */}
          <h1
            style={{
              fontFamily: "'Baloo 2', sans-serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#0F6B37",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Aplikasi <span style={{ color: "#F5A623" }}>DKPP</span> Jawa Barat
          </h1>

          {/* Deskripsi */}
          <p
            style={{
              color: "#5B6660",
              fontSize: "16px",
              lineHeight: 1.65,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Kumpulan aplikasi dan layanan digital dari Dinas Ketahanan Pangan
            dan Peternakan Provinsi Jawa Barat. Mulai dari peternakan, kesehatan
            hewan, hingga ketahanan pangan, dalam satu pintu akses.
          </p>

          {/* Search Bar */}
          <div
            style={{
              maxWidth: "640px",
              margin: "32px auto 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#fff",
              border: "1.5px solid #E5E9E4",
              borderRadius: "14px",
              padding: "6px 6px 6px 18px",
              boxShadow: "0 6px 20px rgba(20,60,30,0.07)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8A938D"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Cari aplikasi, mis. 'ternak', 'pelatihan'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "14.5px",
                fontFamily: "'Inter', sans-serif",
                padding: "10px 0",
                background: "transparent",
              }}
            />
          </div>
        </section>

        {/* ── CARD GRID ── */}
        <section className="dkpp-grid-section">
          <div className="dkpp-grid">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>


        <Footer />
      </main>

      {/* ── Scoped Responsive Styles ── */}
      <style jsx>{`
        .dkpp-hero {
          padding: 64px 48px 40px;
          text-align: center;
          max-width: 920px;
          margin: 0 auto;
        }
        .dkpp-grid-section {
          padding: 44px 48px 60px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .dkpp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .dkpp-footnote-wrap {
          max-width: 1280px;
          margin: 0 auto 60px;
          padding: 0 48px;
        }
        @media (max-width: 980px) {
          .dkpp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .dkpp-grid {
            grid-template-columns: 1fr;
          }
          .dkpp-hero,
          .dkpp-grid-section,
          .dkpp-footnote-wrap {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
    },
  };
};
