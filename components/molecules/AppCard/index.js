import React from "react";

/**
 * AppCard
 * Kartu aplikasi DKPP dengan animasi rotating border saat hover
 * (adaptasi dari uiverse.io/gharsh11032000/heavy-snake-69)
 *
 * @param {{ app: import("@/utils/constant/aplikasiDkpp").aplikasiDkpp[number] }} props
 */
function AppCard({ app }) {
  return (
    <>
      <a
        href={app.href}
        target="_blank"
        rel="noreferrer"
        className="dkpp-card"
        style={{ "--btn-color": app.btnColor }}
      >
        {/* Inner wrapper – background putih, desain kartu */}
        <div className="dkpp-card-inner">

          {/* ── Card Art ── */}
          <div
            className="dkpp-card-art"
            style={{ background: app.artBg || "#E4F1E4" }}
          >
            {/* Logo / Gambar Card — diambil dari artImage per card, fallback ke logo Jawa Barat */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.artImage || "/logos/jawa_barat_logo.svg"}
              alt={app.artImage ? `Logo ${app.name}` : "Logo Jawa Barat"}
              className="dkpp-jabar-logo"
            />

            {/* Badge "Anda di sini" */}
            {app.isHere && (
              <span className="dkpp-here-tag">Anda di sini</span>
            )}
          </div>

          {/* ── Card Body ── */}
          <div className="dkpp-card-body">
            <span
              className="dkpp-owner"
              style={{ color: app.ownerColor }}
            >
              {app.owner}
            </span>

            <h3 className="dkpp-title">{app.name}</h3>

            <p className="dkpp-desc">{app.description}</p>

            {/* ── Card Footer ── */}
            <div className="dkpp-card-footer">
              <span className="dkpp-url">{app.urlText}</span>
              <span
                className="dkpp-visit-btn"
                style={{ background: app.btnColor }}
              >
                Kunjungi
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>

      {/* ── Scoped Styles ── */}
      <style jsx>{`
        /* === WRAPPER KARTU === */
        .dkpp-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 2px;                          /* ruang untuk border animasi */
          border-radius: 10px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
          background: transparent;
        }

        /* === ROTATING BORDER (pseudo element) === */
        .dkpp-card::before {
          content: "";
          position: absolute;
          height: 160%;
          width: 160%;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          border-radius: inherit;
          background: var(--btn-color, #1B7A43);
          transform-origin: center;
          /* mulai dalam kondisi paused */
          animation: dkpp-spin 3.6s linear infinite paused;
          transition: all 0.88s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }

        /* Saat hover → putar border dan ciutkan ke strip tipis */
        .dkpp-card:hover::before {
          animation-play-state: running;
          width: 18%;
        }

        /* Hover: naik + shadow */
        .dkpp-card:hover {
          scale: 1.03;
          box-shadow:
            0rem 6px 13px rgba(20, 60, 30, 0.12),
            0rem 24px 24px rgba(20, 60, 30, 0.09),
            0rem 55px 33px rgba(20, 60, 30, 0.05);
        }

        @keyframes dkpp-spin {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* === INNER CARD (yang menutupi pseudo element) === */
        .dkpp-card-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #E5E9E4;
          transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* === CARD ART === */
        .dkpp-card-art {
          height: 150px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dkpp-jabar-logo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 2;
          transition: transform 0.4s ease;
        }

        .dkpp-card:hover .dkpp-jabar-logo {
          transform: scale(1.06);
        }

        .dkpp-code-tag {
          position: absolute;
          top: 12px;
          left: 14px;
          z-index: 3;
          background: rgba(255, 255, 255, 0.85);
          color: #1E2A22;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 4px 9px;
          border-radius: 7px;
        }

        .dkpp-here-tag {
          position: absolute;
          top: 12px;
          right: 14px;
          z-index: 3;
          background: #0F6B37;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 4px 10px;
          border-radius: 999px;
        }

        /* === CARD BODY === */
        .dkpp-card-body {
          padding: 20px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .dkpp-owner {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .dkpp-title {
          font-family: "Baloo 2", sans-serif;
          font-size: 17.5px;
          font-weight: 700;
          color: #1E2A22;
          line-height: 1.3;
          margin: 0;
        }

        .dkpp-desc {
          font-size: 13.5px;
          color: #5B6660;
          line-height: 1.55;
          flex: 1;
          margin: 0;
        }

        /* === CARD FOOTER === */
        .dkpp-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding-top: 14px;
          border-top: 1px solid #E5E9E4;
        }

        .dkpp-url {
          font-size: 11.5px;
          color: #8A938D;
        }

        .dkpp-visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-weight: 700;
          font-size: 13.5px;
          padding: 9px 16px;
          border-radius: 999px;
          color: #fff;
          transition: opacity 0.15s ease;
        }

        .dkpp-visit-btn:hover {
          opacity: 0.88;
        }
      `}</style>
    </>
  );
}

export default AppCard;
