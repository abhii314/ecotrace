"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TREES = [
  { name: "Neem Tree", slug: "neem", price: "₹50,000", oxygen: "25 kg/year", package: "100 trees", benefit: "Air purifier", img: "/trees/neem.avif", accent: "#f0fdf4" },

  { name: "Mango Tree", slug: "mango", price: "₹50,000", oxygen: "30 kg/year", package: "100 trees", benefit: "Fruit-bearing", img: "/trees/mango.avif", accent: "#fefce8" },

  { name: "Guava Tree", slug: "guava", price: "₹50,000", oxygen: "22 kg/year", package: "100 trees", benefit: "Native species", img: "/trees/guava.avif", accent: "#f0fdf4" },

  { name: "Drumstick Tree", slug: "drumstick", price: "₹50,000", oxygen: "20 kg/year", package: "100 trees", benefit: "Nitrogen-fixer", img: "/trees/drumstick.avif", accent: "#ecfdf5" },
];

const OCCASIONS = [
  { emoji: "🎂", title: "Birthday",             desc: "A thoughtful, sustainable gift that grows with time. Make someone's birthday unforgettable with a gesture that brings life to the planet." },
  { emoji: "💍", title: "Wedding",              desc: 'Transform your celebration into something beautiful for the Earth. Plant trees as wedding favors and let your "yes" bloom into a greener future.' },
  { emoji: "👶", title: "Birth",                desc: "Welcome new life with a forest of hope. Celebrate this precious beginning by planting trees that nurture a fairer, greener tomorrow." },
  { emoji: "🌹", title: "In Memory",            desc: "Honor a loved one with a tribute that lives on. Planting a forest in their memory lets their story, love, and legacy continue to grow." },
  { emoji: "🌱", title: "Create Your Occasion", desc: "Start a collective green gesture. Bring your group, family, or community together to create a forest and make a meaningful impact—together." },
];

/* ─────────────────────────────────────────────
   INLINE SVG ICONS (page-specific only)
───────────────────────────────────────────── */
const IconCart = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconInfo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

/* ─────────────────────────────────────────────
   PAGE-SCOPED STYLES
───────────────────────────────────────────── */
const PAGE_CSS = `
  @keyframes floatA { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(5deg); } }
  @keyframes floatB { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-4deg); } }
  .fla { animation: floatA 7s ease-in-out infinite; }
  .flb { animation: floatB 9s ease-in-out infinite 1.5s; }

  .tc  { transition: transform 0.27s ease, box-shadow 0.27s ease; }
  .tc:hover { transform: translateY(-8px); box-shadow: 0 28px 52px rgba(15,157,88,0.18) !important; }
  .oc  { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .oc:hover { transform: translateY(-7px); box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important; }

  .bhp { transition: transform 0.2s, box-shadow 0.2s; }
  .bhp:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(255,255,255,0.3) !important; }
  .bho { transition: transform 0.2s, background 0.2s; }
  .bho:hover { transform: translateY(-2px); background: rgba(255,255,255,0.15) !important; }
  .bgf { transition: background 0.18s, transform 0.18s; }
  .bgf:hover { background: #0a8c4a !important; transform: translateY(-1px); }
  .bad { transition: background 0.18s, transform 0.18s; }
  .bad:hover { background: #0a8c4a !important; transform: translateY(-1px); }
  .bin { transition: background 0.18s; }
  .bin:hover { background: #bbf7d0 !important; }

  .hdots { background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0); background-size: 28px 28px; }
  .cdots { background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 30px 30px; }

  .hbtns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .tbar  { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }

  @media (max-width: 1024px) {
    .tgrid { grid-template-columns: repeat(2, 1fr) !important; }
    .ogrid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 640px) {
    .tgrid { grid-template-columns: 1fr !important; }
    .ogrid { grid-template-columns: 1fr !important; }
    .hbtns { flex-direction: column !important; align-items: center !important; }
    .tbar  { gap: 24px !important; }
  }
`;

/* ─────────────────────────────────────────────
   SECTIONS
───────────────────────────────────────────── */
function Occasions() {
  return (
    <section style={{ background: "linear-gradient(180deg, #0f9d58 0%, #0a7d44 100%)", padding: "92px 24px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 58 }}>
          <h2 style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.85rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.8px", margin: "0 0 14px" }}>Moments That Deserve to Take Root</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>Some memories deserve more than a celebration — they deserve to grow.</p>
        </div>
        <div className="ogrid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18 }}>
          {OCCASIONS.map(occ => (
            <div key={occ.title} className="oc" style={{ background: "#fff", borderRadius: 20, padding: "28px 20px 24px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
              <span style={{ fontSize: 40 }}>{occ.emoji}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f9d58", margin: 0, letterSpacing: "-0.2px" }}>{occ.title}</h3>
              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.68, margin: 0, flex: 1 }}>{occ.desc}</p>
              <button className="bgf" style={{ background: "#0f9d58", color: "#fff", border: "none", borderRadius: 12, padding: "11px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>
                Create your Forest
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #0a3d2e 0%, #0d6b4a 25%, #0a7d6e 55%, #0891b2 100%)",
      padding: "110px 24px 120px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      minHeight: 520,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
 
      {/* Subtle mesh overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.055) 1px, transparent 0)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
 
      {/* Large soft glow orbs */}
      <div style={{ position: "absolute", top: "-20%", left: "-8%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(8,145,178,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-25%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,157,88,0.20) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", left: "40%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
 
      {/* Floating emojis */}
      <span className="fla" style={{ position: "absolute", top: "20%", left: "6%",  fontSize: 56, opacity: 0.10, pointerEvents: "none", userSelect: "none" }}>🌿</span>
      <span className="flb" style={{ position: "absolute", top: "15%", right: "7%", fontSize: 46, opacity: 0.09, pointerEvents: "none", userSelect: "none" }}>🌳</span>
      <span className="fla" style={{ position: "absolute", bottom: "18%", left: "13%", fontSize: 34, opacity: 0.08, pointerEvents: "none", userSelect: "none", animationDelay: "2s" }}>🌱</span>
      <span className="flb" style={{ position: "absolute", bottom: "22%", right: "12%", fontSize: 30, opacity: 0.07, pointerEvents: "none", userSelect: "none", animationDelay: "3.5s" }}>🍃</span>
 
      {/* Content */}
      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 2 }}>
 
        {/* Badge */}
        <div style={{ marginBottom: 32 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(12px)",
            color: "#a7f3d0",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "8px 22px", borderRadius: 9999,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
            Corporate Partnership Program
          </span>
        </div>
 
        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.6rem, 5.8vw, 4.2rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.10,
          letterSpacing: "-2px",
          margin: "0 0 10px",
        }}>
          Lead the Change,
        </h1>
        <h1 style={{
          fontSize: "clamp(2.6rem, 5.8vw, 4.2rem)",
          fontWeight: 900,
          background: "linear-gradient(92deg, #6ee7b7 0%, #34d399 40%, #a7f3d0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.10,
          letterSpacing: "-2px",
          margin: "0 0 28px",
        }}>
          Grow a Sustainable Legacy
        </h1>
 
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.82,
          maxWidth: 520,
          margin: "0 auto 48px",
          fontWeight: 400,
        }}>
          Together, we can create meaningful impact.<br />
          Let your company's actions speak louder by nurturing trees that protect the future.
        </p>
 
        {/* Buttons */}
        <div className="hbtns" style={{ marginBottom: 64 }}>
          <button className="bhp" style={{
            background: "linear-gradient(135deg, #fff 0%, #f0fdf4 100%)",
            color: "#0a5c3a",
            border: "none", borderRadius: 9999,
            padding: "15px 44px", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 8px 28px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.10)",
            letterSpacing: "0.01em",
          }}>
            Explore Programs →
          </button>
          <button className="bho" style={{
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.30)",
            backdropFilter: "blur(12px)",
            borderRadius: 9999,
            padding: "15px 44px", fontSize: 15, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Schedule Demo
          </button>
        </div>
 
        {/* Stats bar */}
        <div style={{
          display: "inline-flex", gap: 0,
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          overflow: "hidden",
        }}>
          {[["500+", "Companies"], ["1M+", "Trees Planted"], ["28", "States Covered"], ["100%", "Verified Impact"]].map(([n, l], i, arr) => (
            <div key={l} style={{
              padding: "18px 32px",
              textAlign: "center",
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.10)" : "none",
            }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.5px" }}>{n}</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.58)", fontWeight: 500, marginTop: 6, letterSpacing: "0.04em" }}>{l}</div>
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
}

function TreeGrid({ onAdd }) {
  return (
    <section style={{ background: "#f0fdf4", padding: "92px 24px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
 
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            display: "inline-block",
            color: "#0f9d58", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 14,
            border: "1px solid #bbf7d0", background: "#dcfce7",
            padding: "5px 16px", borderRadius: 9999,
          }}>Corporate Programs</span>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: "#111827", letterSpacing: "-1px", margin: "0 0 14px" }}>
            Choose Your Corporate Program
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.72 }}>
            Select from our curated corporate tree adoption programs and enhance your sustainability initiatives
          </p>
        </div>
 
        {/* Grid */}
        <div className="tgrid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
          {TREES.map(tree => (
            <div key={tree.slug} className="tc" style={{
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid #e2f5ea",
              display: "flex",
              flexDirection: "column",
            }}>
 
              {/* Image */}
              <div style={{ height: 210, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <img
                  src={tree.img} alt={tree.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  onError={e => { e.target.style.display = "none"; if (e.target.nextSibling) e.target.nextSibling.style.display = "flex"; }}
                />
                <div style={{ display: "none", width: "100%", height: "100%", background: "linear-gradient(135deg,#d1fae5,#a7f3d0)", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🌿</div>
              </div>
 
              {/* Body */}
              <div style={{ padding: "18px 18px 20px", background: tree.accent, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 6px", letterSpacing: "-0.3px" }}>{tree.name}</h3>
 
                {/* Price + Oxygen row */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 12px" }}>
                  <div>
                    <div style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 500, marginBottom: 2, letterSpacing: "0.04em" }}>Price</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", lineHeight: 1 }}>{tree.price}</div>
                  </div>
                  <div style={{
                    background: "#fff",
                    border: "1px solid #d1fae5",
                    borderRadius: 10,
                    padding: "6px 12px",
                    textAlign: "right",
                    lineHeight: 1.3,
                  }}>
                    <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500 }}>Oxygen</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f9d58" }}>{tree.oxygen}</div>
                  </div>
                </div>
 
                {/* Package badge */}
                <div style={{ marginBottom: 16 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: "#0f9d58",
                    color: "#fff",
                    fontSize: 11, fontWeight: 600,
                    padding: "5px 13px", borderRadius: 9999,
                  }}>
                    Package: {tree.package}
                  </span>
                </div>
 
                {/* Buttons */}
                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                  <button className="bin" style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "#f0fdf4",
                    color: "#065f46",
                    border: "1.5px solid #bbf7d0",
                    borderRadius: 10,
                    padding: "10px 16px", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}>
                    <IconInfo /> Info
                  </button>
                  <button className="bad" onClick={() => onAdd(tree)} style={{
                    flex: 1,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                    background: "#0f9d58",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 14px", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    boxShadow: "0 4px 14px rgba(15,157,88,0.30)",
                  }}>
                    <IconCart size={14} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function CorporateCTA() {
  return (
    <section className="cdots" style={{ background: "linear-gradient(135deg, #0d9488 0%, #0891b2 55%, #1a65af 100%)", padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, right: -40, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <span style={{ display: "inline-block", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "7px 20px", borderRadius: 9999, marginBottom: 28 }}>
          Corporate Partnership
        </span>
        <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-1.2px", margin: "0 0 22px" }}>
          Create Impact That<br />Outlives Your Brand
        </h2>
        <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.12rem)", color: "rgba(255,255,255,0.86)", lineHeight: 1.78, maxWidth: 540, margin: "0 auto 44px" }}>
          Work with us to make your CSR truly meaningful. Each tree your company plants becomes a lasting contribution to cleaner air, restored ecosystems, and a healthier tomorrow for future generations.
        </p>
        <div className="hbtns">
          <button className="bhp" style={{ background: "#fff", color: "#0a6b7e", border: "none", borderRadius: 9999, padding: "15px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 20px rgba(0,0,0,0.16)" }}>Start Partnership</button>
          <button className="bho" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.65)", borderRadius: 9999, padding: "15px 40px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Schedule Demo</button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function OrganizationsPage() {
  return (
    <Layout>
      {({ addToCart }) => (
        <>
          <style>{PAGE_CSS}</style>
          <Hero />
          {/* <Occasions /> */}
          <TreeGrid onAdd={addToCart} />
         
          <CorporateCTA />
        </>
      )}
    </Layout>
  );
}