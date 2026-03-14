"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

/* ─────────────────────────────────────────────
   PAGE-SCOPED STYLES
───────────────────────────────────────────── */
const PAGE_CSS = `
  @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes expand   { from { opacity:0; transform:scaleY(0.94); } to { opacity:1; transform:scaleY(1); } }
  @keyframes countUp  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }

  .fu  { animation: fadeUp 0.6s ease both; }
  .fu1 { animation: fadeUp 0.6s 0.08s ease both; }
  .fu2 { animation: fadeUp 0.6s 0.16s ease both; }
  .fu3 { animation: fadeUp 0.6s 0.24s ease both; }

  .contrib-row {
    transition: background 0.22s, box-shadow 0.22s;
    cursor: pointer;
  }
  .contrib-row:hover { background: rgba(255,255,255,0.06) !important; }

  .expand-panel { animation: expand 0.32s cubic-bezier(.4,0,.2,1) both; transform-origin: top; }

  .filter-btn { transition: all 0.18s; }
  .filter-btn:hover { background: rgba(255,255,255,0.14) !important; }

  .stat-box { transition: transform 0.2s, box-shadow 0.2s; }
  .stat-box:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18) !important; }

  .tag-pill { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; }

  .hdots { background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0); background-size: 28px 28px; }

  @media (max-width: 768px) {
    .impact-grid { grid-template-columns: repeat(2,1fr) !important; }
    .stat-row    { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (max-width: 480px) {
    .impact-grid { grid-template-columns: 1fr !important; }
    .stat-row    { grid-template-columns: 1fr !important; }
  }
`;

/* ─────────────────────────────────────────────
   DATA — 14 CONTRIBUTORS
───────────────────────────────────────────── */
const CONTRIBUTORS = [
  {
    id: 1,
    name: "Electra Bouffe",
    initials: "EB",
    avatar: null,
    location: "Mumbai, Maharashtra",
    type: "Individual",
    lastAdoption: "Mar 13, 2026",
    trees: 7,
    oxygen: 840,
    co2: 350,
    communities: 3,
    fruits: "420 kg",
    forests: 2,
    topTree: "Mango Tree",
    badge: "🥇 Top Contributor",
    badgeColor: "#f59e0b",
    avatarBg: "linear-gradient(135deg,#0f9d58,#0a7d44)",
  },
  {
    id: 2,
    name: "Aditya Tekumalla",
    initials: "AT",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80",
    location: "Hyderabad, Telangana",
    type: "Individual",
    lastAdoption: "Jan 30, 2026",
    trees: 12,
    oxygen: 1440,
    co2: 600,
    communities: 5,
    fruits: "720 kg",
    forests: 3,
    topTree: "Neem Tree",
    badge: "🌟 Green Champion",
    badgeColor: "#10b981",
    avatarBg: "linear-gradient(135deg,#0891b2,#0f9d58)",
  },
  {
    id: 3,
    name: "avneesh",
    initials: "A",
    avatar: null,
    location: "Pune, Maharashtra",
    type: "Individual",
    lastAdoption: "Feb 11, 2026",
    trees: 1,
    oxygen: 120,
    co2: 50,
    communities: 1,
    fruits: "60 kg",
    forests: 1,
    topTree: "Peepal Tree",
    badge: "🌱 Seedling",
    badgeColor: "#6ee7b7",
    avatarBg: "linear-gradient(135deg,#0f9d58,#15b05e)",
  },
  {
    id: 4,
    name: "Greentech Solutions",
    initials: "GS",
    avatar: null,
    location: "Bengaluru, Karnataka",
    type: "Company",
    lastAdoption: "Mar 10, 2026",
    trees: 500,
    oxygen: 60000,
    co2: 25000,
    communities: 42,
    fruits: "30,000 kg",
    forests: 12,
    topTree: "Bamboo",
    badge: "🏆 Platinum Partner",
    badgeColor: "#a78bfa",
    avatarBg: "linear-gradient(135deg,#1a65af,#0891b2)",
  },
  {
    id: 5,
    name: "Priya Nambiar",
    initials: "PN",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    location: "Kochi, Kerala",
    type: "Individual",
    lastAdoption: "Feb 28, 2026",
    trees: 34,
    oxygen: 4080,
    co2: 1700,
    communities: 9,
    fruits: "2,040 kg",
    forests: 4,
    topTree: "Jackfruit Tree",
    badge: "🌿 Forest Builder",
    badgeColor: "#34d399",
    avatarBg: "linear-gradient(135deg,#0f9d58,#0d9488)",
  },
  {
    id: 6,
    name: "Rahul Deshmukh",
    initials: "RD",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    location: "Nagpur, Maharashtra",
    type: "Individual",
    lastAdoption: "Mar 5, 2026",
    trees: 22,
    oxygen: 2640,
    co2: 1100,
    communities: 7,
    fruits: "1,320 kg",
    forests: 3,
    topTree: "Mango Tree",
    badge: "🌳 Grove Guardian",
    badgeColor: "#0f9d58",
    avatarBg: "linear-gradient(135deg,#0a5c38,#0f9d58)",
  },
  {
    id: 7,
    name: "EcoRoots Pvt Ltd",
    initials: "ER",
    avatar: null,
    location: "Chennai, Tamil Nadu",
    type: "Company",
    lastAdoption: "Mar 12, 2026",
    trees: 250,
    oxygen: 30000,
    co2: 12500,
    communities: 28,
    fruits: "15,000 kg",
    forests: 8,
    topTree: "Banyan Tree",
    badge: "💎 Gold Partner",
    badgeColor: "#f59e0b",
    avatarBg: "linear-gradient(135deg,#0d9488,#0891b2)",
  },
  {
    id: 8,
    name: "Sneha Iyer",
    initials: "SI",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    location: "Coimbatore, Tamil Nadu",
    type: "Individual",
    lastAdoption: "Jan 15, 2026",
    trees: 18,
    oxygen: 2160,
    co2: 900,
    communities: 6,
    fruits: "1,080 kg",
    forests: 2,
    topTree: "Guava Tree",
    badge: "🌿 Forest Builder",
    badgeColor: "#34d399",
    avatarBg: "linear-gradient(135deg,#15b05e,#0f9d58)",
  },
  {
    id: 9,
    name: "Vikram Singh",
    initials: "VS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    location: "Jaipur, Rajasthan",
    type: "Individual",
    lastAdoption: "Feb 20, 2026",
    trees: 45,
    oxygen: 5400,
    co2: 2250,
    communities: 11,
    fruits: "2,700 kg",
    forests: 5,
    topTree: "Neem Tree",
    badge: "🌟 Green Champion",
    badgeColor: "#10b981",
    avatarBg: "linear-gradient(135deg,#0a4d2e,#0f9d58)",
  },
  {
    id: 10,
    name: "Future Farms Co.",
    initials: "FF",
    avatar: null,
    location: "Ahmedabad, Gujarat",
    type: "Company",
    lastAdoption: "Mar 8, 2026",
    trees: 180,
    oxygen: 21600,
    co2: 9000,
    communities: 20,
    fruits: "10,800 kg",
    forests: 6,
    topTree: "Drumstick Tree",
    badge: "💎 Gold Partner",
    badgeColor: "#f59e0b",
    avatarBg: "linear-gradient(135deg,#1a65af,#0d9488)",
  },
  {
    id: 11,
    name: "Arjun Kapoor",
    initials: "AK",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    location: "Indore, Madhya Pradesh",
    type: "Individual",
    lastAdoption: "Mar 1, 2026",
    trees: 37,
    oxygen: 4440,
    co2: 1850,
    communities: 8,
    fruits: "2,220 kg",
    forests: 4,
    topTree: "Mango Tree",
    badge: "🌳 Grove Guardian",
    badgeColor: "#0f9d58",
    avatarBg: "linear-gradient(135deg,#0f7a44,#15b05e)",
  },
  {
    id: 12,
    name: "Ananya Sharma",
    initials: "AS",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
    location: "Delhi, NCR",
    type: "Individual",
    lastAdoption: "Feb 14, 2026",
    trees: 9,
    oxygen: 1080,
    co2: 450,
    communities: 3,
    fruits: "540 kg",
    forests: 2,
    topTree: "Ashoka Tree",
    badge: "🌱 Seedling",
    badgeColor: "#6ee7b7",
    avatarBg: "linear-gradient(135deg,#0f9d58,#0d9488)",
  },
  {
    id: 13,
    name: "Sundarban Forest Trust",
    initials: "SF",
    avatar: null,
    location: "Kolkata, West Bengal",
    type: "Forests",
    lastAdoption: "Mar 11, 2026",
    trees: 1200,
    oxygen: 144000,
    co2: 60000,
    communities: 85,
    fruits: "72,000 kg",
    forests: 28,
    topTree: "Mangrove",
    badge: "🏆 Platinum Partner",
    badgeColor: "#a78bfa",
    avatarBg: "linear-gradient(135deg,#052a18,#0a4d2e)",
  },
  {
    id: 14,
    name: "Meera Patel",
    initials: "MP",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80",
    location: "Surat, Gujarat",
    type: "Individual",
    lastAdoption: "Feb 5, 2026",
    trees: 15,
    oxygen: 1800,
    co2: 750,
    communities: 5,
    fruits: "900 kg",
    forests: 2,
    topTree: "Papaya Tree",
    badge: "🌿 Forest Builder",
    badgeColor: "#34d399",
    avatarBg: "linear-gradient(135deg,#0f9d58,#15b05e)",
  },
];

const FILTERS_TYPE = ["All", "Individuals", "Companies", "Forests"];
const FILTERS_SORT = ["Most Trees", "Most Oxygen", "CO₂ Reduced"];

/* ─────────────────────────────────────────────
   AVATAR
───────────────────────────────────────────── */
function Avatar({ c, size = 56 }) {
  return c.avatar ? (
    <img src={c.avatar} alt={c.name}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2.5px solid rgba(255,255,255,0.25)" }}
      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
    />
  ) : null;
}

function AvatarFallback({ c, size = 56 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: c.avatarBg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 800, color: "#fff",
      flexShrink: 0, border: "2.5px solid rgba(255,255,255,0.20)",
      boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    }}>
      {c.initials}
    </div>
  );
}

function ContribAvatar({ c, size = 56 }) {
  const [imgFailed, setImgFailed] = useState(false);
  if (!c.avatar || imgFailed) return <AvatarFallback c={c} size={size} />;
  return (
    <img src={c.avatar} alt={c.name}
      onError={() => setImgFailed(true)}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2.5px solid rgba(255,255,255,0.22)", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}
    />
  );
}

/* ─────────────────────────────────────────────
   EXPANDED IMPACT PANEL
───────────────────────────────────────────── */
function ImpactPanel({ c }) {
  const impacts = [
    { icon: "🌳", label: "Trees Adopted",       value: c.trees.toLocaleString(),          sub: "trees",           color: "#0f9d58" },
    { icon: "💨", label: "Oxygen Generated",    value: c.oxygen.toLocaleString(),          sub: "kg / year",       color: "#0891b2" },
    { icon: "♻️", label: "CO₂ Absorbed",       value: c.co2.toLocaleString(),             sub: "kg CO₂ / year",   color: "#a78bfa" },
    { icon: "🏘️", label: "Communities Fed",    value: c.communities.toLocaleString(),     sub: "villages",        color: "#f59e0b" },
    { icon: "🍎", label: "Fruits Yielded",      value: c.fruits,                           sub: "annually",        color: "#ef4444" },
    { icon: "🌲", label: "Forests Created",     value: c.forests.toLocaleString(),         sub: "forests",         color: "#10b981" },
  ];

  return (
    <div className="expand-panel" style={{
      margin: "0 18px 18px",
      background: "rgba(0,0,0,0.18)",
      borderRadius: 14,
      padding: "24px 22px",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Top Adopted Tree</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#a7f3d0" }}>🌿 {c.topTree}</div>
        </div>
        <span style={{ background: `${c.badgeColor}22`, color: c.badgeColor, border: `1px solid ${c.badgeColor}44`, padding: "5px 14px", borderRadius: 9999, fontSize: 11.5, fontWeight: 700 }}>
          {c.badge}
        </span>
      </div>

      {/* Impact stats grid */}
      <div className="impact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {impacts.map(imp => (
          <div key={imp.label} className="stat-box" style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "14px 16px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>{imp.icon}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 4 }}>{imp.label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: imp.color, letterSpacing: "-0.5px", lineHeight: 1 }}>{imp.value}</div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{imp.sub}</div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 18, padding: "12px 16px", background: "rgba(15,157,88,0.12)", borderRadius: 10, border: "1px solid rgba(15,157,88,0.20)" }}>
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.60)", margin: 0, lineHeight: 1.65 }}>
          🌍 <strong style={{ color: "rgba(255,255,255,0.80)" }}>{c.name}</strong>'s trees are GPS-tagged, growth-monitored, and independently verified. Their contribution helps sustain <strong style={{ color: "#6ee7b7" }}>{c.communities} local communities</strong> through fruit yield and cleaner air.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTRIBUTOR ROW
───────────────────────────────────────────── */
function ContribRow({ c, rank, isOpen, onToggle }) {
  const rankColors = ["#f59e0b", "#9ca3af", "#cd7c2f"];
  const rankLabel  = ["🥇", "🥈", "🥉"];

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      borderRadius: 16,
      border: isOpen ? "1px solid rgba(15,157,88,0.35)" : "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
      transition: "border-color 0.22s",
    }}>
      {/* Main row */}
      <div className="contrib-row" onClick={onToggle} style={{
        padding: "18px 22px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: isOpen ? "rgba(15,157,88,0.08)" : "transparent",
      }}>

        {/* Rank */}
        <div style={{
          width: 32, flexShrink: 0, textAlign: "center",
          fontSize: rank <= 3 ? 20 : 13,
          fontWeight: 800,
          color: rank <= 3 ? rankColors[rank - 1] : "rgba(255,255,255,0.30)",
        }}>
          {rank <= 3 ? rankLabel[rank - 1] : `#${rank}`}
        </div>

        {/* Avatar */}
        <ContribAvatar c={c} size={52} />

        {/* Name + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.2px", marginBottom: 3 }}>{c.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>📍 {c.location}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.30)" }}>·</span>
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.38)" }}>Last adoption: {c.lastAdoption}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, flexShrink: 0 }}>
          {[
            { icon: "🌳", label: "TREES",   val: c.trees.toLocaleString() },
            { icon: "💨", label: "OXYGEN",  val: c.oxygen >= 1000 ? `${(c.oxygen/1000).toFixed(1)}k` : c.oxygen, sub: "kg/year" },
            { icon: "♻️", label: "CO₂",    val: c.co2 >= 1000 ? `${(c.co2/1000).toFixed(1)}k` : c.co2,   sub: "kg CO₂/yr" },
          ].map(s => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "10px 14px",
              minWidth: 90,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>
                {s.icon} {s.label}
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>{s.val}</div>
              {s.sub && <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Chevron */}
        <div style={{
          flexShrink: 0, width: 28, height: 28,
          borderRadius: "50%", background: "rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.25s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded panel */}
      {isOpen && <ImpactPanel c={c} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hdots" style={{
      background: "linear-gradient(160deg, #052a18 0%, #0a4d2e 35%, #0f7a44 70%, #0d9d6e 100%)",
      padding: "80px 24px 72px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "-10%", left: "-4%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(15,157,88,0.18) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "-3%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,145,178,0.14) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="fu" style={{ fontSize: 40, marginBottom: 14 }}>🏆</div>
        <h1 className="fu1" style={{
          fontSize: "clamp(2.4rem,5vw,3.6rem)",
          fontWeight: 900, color: "#fff",
          letterSpacing: "-1.8px", lineHeight: 1.10, margin: "0 0 18px",
        }}>
          Eco Pavilion
        </h1>
        <p className="fu2" style={{
          fontSize: 16.5, color: "rgba(255,255,255,0.68)",
          lineHeight: 1.78, maxWidth: 480, margin: "0 auto",
        }}>
          Celebrating our top contributors who are making a real impact on our planet
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL STATS BANNER
───────────────────────────────────────────── */
function GlobalStats({ contributors }) {
  const totalTrees  = contributors.reduce((a, c) => a + c.trees, 0);
  const totalO2     = contributors.reduce((a, c) => a + c.oxygen, 0);
  const totalCO2    = contributors.reduce((a, c) => a + c.co2, 0);
  const totalComm   = contributors.reduce((a, c) => a + c.communities, 0);

  const stats = [
    { icon: "🌳", label: "Total Trees",        val: totalTrees.toLocaleString() },
    { icon: "💨", label: "Oxygen Generated",   val: `${(totalO2/1000).toFixed(0)}k kg` },
    { icon: "♻️", label: "CO₂ Absorbed",      val: `${(totalCO2/1000).toFixed(0)}k kg` },
    { icon: "🏘️", label: "Communities Served", val: totalComm.toLocaleString() },
  ];

  return (
    <div style={{
      background: "rgba(0,0,0,0.20)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "22px 32px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 5 }}>{s.icon} {s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80", letterSpacing: "-0.5px" }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LEADERBOARD
───────────────────────────────────────────── */
function Leaderboard() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Most Trees");
  const [openId, setOpenId] = useState(null);

  const filtered = CONTRIBUTORS
    .filter(c => {
      if (typeFilter === "All") return true;
      if (typeFilter === "Individuals") return c.type === "Individual";
      if (typeFilter === "Companies")  return c.type === "Company";
      if (typeFilter === "Forests")    return c.type === "Forests";
      return true;
    })
    .sort((a, b) => {
      if (sortFilter === "Most Trees")   return b.trees  - a.trees;
      if (sortFilter === "Most Oxygen")  return b.oxygen - a.oxygen;
      if (sortFilter === "CO₂ Reduced") return b.co2    - a.co2;
      return 0;
    });

  return (
    <div style={{ background: "linear-gradient(180deg,#083d22 0%,#062e1a 100%)", minHeight: "60vh", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>

        {/* Filter row 1 — Type */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {FILTERS_TYPE.map(f => (
            <button key={f} className="filter-btn" onClick={() => { setTypeFilter(f); setOpenId(null); }} style={{
              padding: "9px 22px", borderRadius: 9999, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              background: typeFilter === f ? "#0f9d58" : "rgba(255,255,255,0.07)",
              color: typeFilter === f ? "#fff" : "rgba(255,255,255,0.65)",
              border: typeFilter === f ? "1.5px solid #0f9d58" : "1.5px solid rgba(255,255,255,0.12)",
              boxShadow: typeFilter === f ? "0 4px 16px rgba(15,157,88,0.35)" : "none",
              transition: "all 0.18s",
            }}>
              {f === "Individuals" ? "👤 " : f === "Companies" ? "🏢 " : f === "Forests" ? "🌲 " : ""}{f}
            </button>
          ))}
        </div>

        {/* Filter row 2 — Sort */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
          {FILTERS_SORT.map(f => (
            <button key={f} className="filter-btn" onClick={() => { setSortFilter(f); setOpenId(null); }} style={{
              padding: "9px 22px", borderRadius: 9999, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              background: sortFilter === f ? "#f59e0b" : "rgba(255,255,255,0.07)",
              color: sortFilter === f ? "#fff" : "rgba(255,255,255,0.65)",
              border: sortFilter === f ? "1.5px solid #f59e0b" : "1.5px solid rgba(255,255,255,0.12)",
              boxShadow: sortFilter === f ? "0 4px 16px rgba(245,158,11,0.35)" : "none",
              transition: "all 0.18s",
            }}>
              {f === "Most Trees" ? "🌳 " : f === "Most Oxygen" ? "💨 " : "♻️ "}{f}
            </button>
          ))}
        </div>

        {/* Contributor rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((c, idx) => (
            <ContribRow
              key={c.id}
              c={c}
              rank={idx + 1}
              isOpen={openId === c.id}
              onToggle={() => setOpenId(openId === c.id ? null : c.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
            No contributors found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ImpactCenterPage() {
  return (
    <Layout>
      {() => (
        <>
          <style>{PAGE_CSS}</style>
          <Hero />
          <div style={{ background: "linear-gradient(180deg,#083d22 0%,#062e1a 100%)" }}>
            <GlobalStats contributors={CONTRIBUTORS} />
          </div>
          <Leaderboard />
        </>
      )}
    </Layout>
  );
}