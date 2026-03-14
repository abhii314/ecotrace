"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const TREES = [
  {
    name: "Papaya Tree",
    price: 499,
    o2: "30 kg/yr",
    tag: "Fruit Bearer",
    desc: "Fast-growing tropical bearer of sweet fruit and generous shade.",
    img: "/trees/papaya.avif"
  },
  {
    name: "Bamboo",
    price: 499,
    o2: "120 kg/yr",
    tag: "Fastest Growing",
    desc: "World's fastest-growing plant — an unrivalled carbon-capture champion.",
    img: "/trees/bamboo.avif"
  },
  {
    name: "Rubber Tree",
    price: 499,
    o2: "70 kg/yr",
    tag: "Industrial",
    desc: "Dense evergreen canopy delivering impressive year-round oxygen output.",
    img: "/trees/rubber.avif"
  },
  {
    name: "Ashoka Tree",
    price: 499,
    o2: "18 kg/yr",
    tag: "Sacred",
    desc: "Sacred ornamental tree revered for its lush foliage.",
    img: "/trees/ashoka.avif"
  },
  {
    name: "Neem Tree",
    price: 549,
    o2: "100 kg/yr",
    tag: "Medicinal",
    desc: "India's natural pharmacy with powerful air-purifying properties.",
    img: "/trees/neem.avif"
  },
  {
    name: "Mango Tree",
    price: 599,
    o2: "50 kg/yr",
    tag: "Evergreen",
    desc: "The king of fruits — symbol of Indian summers.",
    img: "/trees/mango.avif"
  },
  {
    name: "Siris Tree",
    price: 649,
    o2: "200 kg/yr",
    tag: "Ancient",
    desc: "India's national tree with sweeping canopy.",
    img: "/trees/siris.jpg"
  },
  
  {
  name: "Golden Shower Tree",
    price: 499,
    o2: "150 kg/yr",
    tag: "24/7 Oxygen",
    desc: "The only tree releasing oxygen around the clock.",
    img: "/trees/Golden.avif"
  }
];

const MARQUEE_ITEMS = [
  "🌳 128,540 Trees Planted",
  "💨 7.7M kg Oxygen Generated",
  "♻️ 2.5M kg CO₂ Reduced",
  "🌲 342 Forests Created",
  "🇮🇳 Rooted Across 18 Indian States",
  "🤝 Trusted by 40,000+ Families",
];

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(145deg, #052a18 0%, #0a4d2e 30%, #0f7a44 60%, #15b05e 85%, #1ecc6e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 66,
      }}
    >
      {/* Dot texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Gradient orbs */}
      <div style={{ position: "absolute", top: "8%", right: "5%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,204,110,0.18) 0%, transparent 68%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-3%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,204,110,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Floating leaf */}
      <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", opacity: 0.05, animation: "float 8s ease-in-out infinite", pointerEvents: "none" }}>
        <svg width="380" height="480" viewBox="0 0 380 480" fill="none">
          <path d="M190 24C190 24 64 96 48 214C32 332 96 412 190 458C284 412 348 332 332 214C316 96 190 24 190 24Z" fill="white" />
          <line x1="190" y1="24" x2="190" y2="458" stroke="white" strokeWidth="3" />
        </svg>
      </div>

      {/* Content */}
      <div style={{ textAlign: "center", zIndex: 2, padding: "0 28px", maxWidth: 860 }}>
        <div className="fu" style={{ marginBottom: 32 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(30,204,110,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(30,204,110,0.25)", borderRadius: 100, padding: "7px 20px", fontFamily: "'Poppins',sans-serif", fontSize: 11.5, color: "#a7f3d0", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", animation: "dot-pulse 2.2s infinite", display: "inline-block" }} />
            Real Trees · Location · Verified Impact
          </span>
        </div>

        <h1 className="fu1" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(52px, 7.5vw, 90px)", fontWeight: 800, color: "#fff", lineHeight: 1.06, letterSpacing: "-2px", marginBottom: 10 }}>
          Plant a Dream,
        </h1>
        <h1 className="fu2" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(52px, 7.5vw, 90px)", fontWeight: 800, background: "linear-gradient(92deg, #a7f3d0 0%, #4ade80 50%, #bbf7d0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.06, letterSpacing: "-2px", marginBottom: 38 }}>
          Watch It Grow
        </h1>

        <p className="fu3" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.80, maxWidth: 530, margin: "0 auto 48px" }}>
          A single tree can become your lifelong legacy.<br />
          Nurture nature today — watch your impact bloom for generations.
        </p>

        <div className="fu4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <div
  className="fu4"
  style={{
    display: "flex",
    gap: 14,
    justifyContent: "center",
    flexWrap: "wrap",
  }}
>
  <Link href="#">
    <button className="btn-white">Browse Trees →</button>
  </Link>

  <Link href="/create-forest">
    <button className="btn-ghost">Create Forest</button>
  </Link>
</div>
        </div>

        {/* Scroll cue */}
        <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 27, height: 44, border: "1.5px solid rgba(255,255,255,0.20)", borderRadius: 14, display: "flex", justifyContent: "center", paddingTop: 7 }}>
            <div style={{ width: 3, height: 10, background: "#4ade80", borderRadius: 3, animation: "scroll-bob 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MARQUEE STRIP
═══════════════════════════════════════════════ */
function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ background: "linear-gradient(90deg,#0a4d2e,#0f7a44)", padding: "13px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.80)", whiteSpace: "nowrap", padding: "0 44px", letterSpacing: "0.03em" }}>
            {item}
            <span style={{ marginLeft: 44, color: "rgba(255,255,255,0.22)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TREE CARD
═══════════════════════════════════════════════ */
function TreeCard({ tree, onAdd }) {
  const [added, setAdded] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const handle = () => {
    onAdd(tree);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="tcard">
      <div style={{ height: 210, overflow: "hidden", position: "relative", background: "#d4ead8" }}>
        <img className="timg" src={tree.img} alt={tree.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"; }}
        />
        <div style={{ position: "absolute", top: 12, left: 12, background: "linear-gradient(135deg,rgba(10,77,46,0.88),rgba(15,122,68,0.88))", backdropFilter: "blur(8px)", color: "#fff", padding: "4px 13px", borderRadius: 100, fontSize: 10.5, fontWeight: 700, fontFamily: "'Poppins',sans-serif", letterSpacing: "0.07em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.15)" }}>
          {tree.tag}
        </div>
      </div>

      <div style={{ padding: "20px 22px 22px" }}>
        <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 700, color: "#0a1a0a", marginBottom: 5, letterSpacing: "-0.2px" }}>{tree.name}</h3>
        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12.5, color: "#6b8070", lineHeight: 1.70, marginBottom: 18, fontWeight: 400 }}>{tree.desc}</p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, padding: "14px 16px", background: "linear-gradient(135deg,#f0fbf4,#e6f7ed)", borderRadius: 14, border: "1px solid rgba(15,122,68,0.12)" }}>
          <div>
            <div style={{ fontSize: 10.5, color: "#7a9a80", fontFamily: "'Poppins',sans-serif", fontWeight: 500, marginBottom: 2 }}>Adopt for</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#0a4d2e", fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.5px" }}>₹{tree.price}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", background: "linear-gradient(135deg,#0a4d2e,#0f7a44)", borderRadius: 12, padding: "9px 16px", gap: 2 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>O₂ / year</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "'Poppins',sans-serif" }}>{tree.o2}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 9 }}>
          <button onClick={() => setInfoOpen(!infoOpen)} style={{ width: 44, height: 44, borderRadius: 100, flexShrink: 0, border: "1.5px solid rgba(10,77,46,0.18)", background: "transparent", color: "#0a4d2e", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.22s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7f2"; e.currentTarget.style.borderColor = "rgba(10,77,46,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(10,77,46,0.18)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a4d2e" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>

          <button onClick={handle} style={{ flex: 1, height: 44, borderRadius: 100, border: "none", background: added ? "linear-gradient(135deg,#166534,#15803d)" : "linear-gradient(135deg,#0a4d2e,#0f7a44)", color: "#fff", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: added ? "0 4px 16px rgba(22,101,52,0.35)" : "0 4px 16px rgba(10,77,46,0.28)" }}>
            {added ? (
              <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Added!</>
            ) : (
              <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> Add to Cart</>
            )}
          </button>
        </div>

        {infoOpen && (
          <div style={{ marginTop: 12, padding: "13px 15px", background: "linear-gradient(135deg,#f0fbf4,#e2f5eb)", borderRadius: 12, border: "1px solid rgba(15,122,68,0.18)", fontFamily: "'Poppins',sans-serif", fontSize: 12.5, color: "#2d5a3d", lineHeight: 1.65, fontWeight: 400 }}>
            📍 GPS-tagged & monitored · 📸 Monthly photo updates · 📜 CO₂ certificate included
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TREES SECTION
═══════════════════════════════════════════════ */
function TreesSection({ onAdd }) {
  return (
    <section style={{ background: "#f4f8f4", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ display: "inline-block", background: "linear-gradient(135deg,#0a4d2e,#0f7a44)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontSize: 12, fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", marginBottom: 16 }}>🌿 Available Trees</span>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 800, color: "#0a1a0a", letterSpacing: "-1px", lineHeight: 1.10, marginBottom: 16 }}>Choose Your Tree</h2>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 15.5, color: "#5a7a65", maxWidth: 500, margin: "0 auto", lineHeight: 1.80, fontWeight: 400 }}>Select from our curated collection of trees and start your green journey today.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 26 }}>
          {TREES.map((t) => <TreeCard key={t.name} tree={t} onAdd={onAdd} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   JOIN / CTA SECTION
═══════════════════════════════════════════════ */
function JoinSection() {
  return (
    <section style={{ background: "linear-gradient(145deg, #052a18 0%, #0a4d2e 30%, #0f7a44 65%, #15b05e 90%, #1ecc6e 100%)", padding: "100px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px)", backgroundSize: "36px 36px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(30,204,110,0.18) 0%,transparent 68%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <span style={{ display: "inline-block", background: "rgba(30,204,110,0.14)", backdropFilter: "blur(10px)", border: "1px solid rgba(30,204,110,0.28)", borderRadius: 100, padding: "5px 18px", marginBottom: 28, fontFamily: "'Poppins',sans-serif", fontSize: 11.5, color: "#a7f3d0", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase" }}>
          Join the Movement
        </span>

        <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.12, marginBottom: 20 }}>
          Take the First Step Toward<br />a Greener Tomorrow
        </h2>

        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 16.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.80, marginBottom: 44, maxWidth: 560, margin: "0 auto 44px" }}>
          When you adopt a tree, you're not just planting — you're nurturing life. Your small, heartfelt action today becomes a gift the future will cherish.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-white" style={{ padding: "15px 38px" }}>Get Started Now</button>
          <button className="btn-ghost" style={{ padding: "14px 38px" }}>Learn More</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <Layout>
      {({ addToCart }) => (
        <>
          <Hero />
          <MarqueeStrip />
          <TreesSection onAdd={addToCart} />
          <JoinSection />
        </>
      )}
    </Layout>
  );
}