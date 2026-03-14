"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/lib/api";   // ← fixed: use alias, not relative path

/* ─────────────────────────────────────────────
   CONSTANTS — environmental formulas
   O₂  ≈ 110 kg / year   CO₂ ≈ 22 kg / year
───────────────────────────────────────────── */
const ANNUAL_O2  = 110;
const ANNUAL_CO2 = 22;

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function calcImpact(plantationDate) {
  const planted = new Date(plantationDate);
  const now     = new Date();
  const days    = Math.max(0, Math.floor((now - planted) / 86400000));
  const months  = days / 30.44;
  const years   = days / 365.25;

  // Only produce values if tree actually exists (days > 0)
  const o2  = days > 0 ? parseFloat(((ANNUAL_O2  / 365) * days).toFixed(1)) : 0;
  const co2 = days > 0 ? parseFloat(((ANNUAL_CO2 / 365) * days).toFixed(1)) : 0;

  const ageStr =
    years >= 1
      ? `${Math.floor(years)} yr${Math.floor(years) > 1 ? "s" : ""} ${Math.floor((years % 1) * 12)} mo`
      : months >= 1
        ? `${Math.round(months)} months`
        : `${days} days`;

  return { days, months, years, o2, co2, ageStr };
}

function getGrowthStage(months) {
  if (months <  3)  return { stage: 1, label: "Seedling",   desc: "Just sprouted — the journey begins." };
  if (months < 12)  return { stage: 2, label: "Sapling",    desc: "Growing strong with fresh leaves." };
  if (months < 36)  return { stage: 3, label: "Young Tree", desc: "Branching out and building roots." };
  return               { stage: 4, label: "Mature Tree", desc: "Fully grown — a lasting legacy." };
}

const hColor = h => h >= 85 ? "#0f9d58" : h >= 65 ? "#f59e0b" : "#ef4444";
const hLabel = h => h >= 85 ? "Thriving" : h >= 65 ? "Growing" : "Needs Care";

/* ─────────────────────────────────────────────
   MOCK — 1 demo tree
   All impact values are derived from plantation_date at runtime,
   so they are always accurate and never hardcoded.
───────────────────────────────────────────── */
const MOCK_TREE = {
  id: 1,
  tree_id: "ECO-2025-001",
  tree_name: "Hari",
  tree_species: "Neem Tree",
  plantation_date: "2025-01-15",   // ~14 months ago → ~41 kg O₂, ~8 kg CO₂
  location: "Hyderabad, Telangana",
  health: 88,
  worker_photos: [
    {
      id: 1,
      worker: "Ramesh K.",
      date: "Mar 13, 2026",
      img: "https://images.unsplash.com/photo-1601823984263-ac0580b9ac8e?w=600&q=80",
      note: "Healthy new leaf growth observed.",
    },
    {
      id: 2,
      worker: "Suresh P.",
      date: "Feb 20, 2026",
      img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80",
      note: "Good canopy spread, soil moisture normal.",
    },
  ],
};

/* ─────────────────────────────────────────────
   SVG TREE ILLUSTRATIONS  (4 growth stages)
───────────────────────────────────────────── */
function SeedlingIllustration() {
  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%" style={{ maxHeight: 220 }}>
      <ellipse cx="100" cy="195" rx="55" ry="12" fill="#8d6e4e" opacity="0.30" />
      <path d="M100 195 Q98 175 100 158" stroke="#6d4c2e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="91"  cy="165" rx="13" ry="7"  fill="#4caf50" transform="rotate(-30 91 165)" />
      <ellipse cx="109" cy="161" rx="13" ry="7"  fill="#66bb6a" transform="rotate(30 109 161)" />
      <ellipse cx="100" cy="156" rx="7"  ry="9"  fill="#81c784" />
      <line x1="55" y1="196" x2="145" y2="196" stroke="#8d6e4e" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      {[[76,145],[122,148],[97,133]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#a5d6a7" opacity="0.70" />)}
      <text x="100" y="215" textAnchor="middle" fontSize="11" fill="#5a8a5a" fontFamily="Poppins,sans-serif" fontWeight="600">Seedling · Stage 1</text>
    </svg>
  );
}

function SaplingIllustration() {
  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%" style={{ maxHeight: 220 }}>
      <ellipse cx="100" cy="195" rx="55" ry="11" fill="#8d6e4e" opacity="0.28" />
      <rect x="95" y="142" width="10" height="53" rx="5" fill="#795548" />
      <ellipse cx="100" cy="150" rx="38" ry="23" fill="#43a047" opacity="0.72" />
      <ellipse cx="100" cy="130" rx="30" ry="20" fill="#4caf50" opacity="0.85" />
      <ellipse cx="100" cy="113" rx="21" ry="16" fill="#66bb6a" />
      <ellipse cx="89"  cy="110" rx="8"  ry="5"  fill="rgba(255,255,255,0.17)" transform="rotate(-15 89 110)" />
      <line x1="58" y1="196" x2="142" y2="196" stroke="#8d6e4e" strokeWidth="2" strokeLinecap="round" opacity="0.38" />
      <text x="100" y="215" textAnchor="middle" fontSize="11" fill="#5a8a5a" fontFamily="Poppins,sans-serif" fontWeight="600">Sapling · Stage 2</text>
    </svg>
  );
}

function YoungTreeIllustration() {
  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%" style={{ maxHeight: 220 }}>
      <ellipse cx="100" cy="196" rx="62" ry="11" fill="#8d6e4e" opacity="0.26" />
      <rect x="93" y="118" width="14" height="78" rx="6" fill="#6d4c2e" />
      <line x1="100" y1="148" x2="65"  y2="137" stroke="#6d4c2e" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="142" x2="135" y2="131" stroke="#6d4c2e" strokeWidth="4.5" strokeLinecap="round" />
      <ellipse cx="100" cy="130" rx="52" ry="32" fill="#388e3c" opacity="0.62" />
      <ellipse cx="100" cy="112" rx="44" ry="28" fill="#43a047" opacity="0.78" />
      <ellipse cx="100" cy="95"  rx="34" ry="23" fill="#4caf50" opacity="0.88" />
      <ellipse cx="100" cy="80"  rx="24" ry="18" fill="#66bb6a" />
      <ellipse cx="63"  cy="130" rx="20" ry="15" fill="#388e3c" opacity="0.72" />
      <ellipse cx="137" cy="125" rx="18" ry="14" fill="#43a047" opacity="0.72" />
      <ellipse cx="88"  cy="78"  rx="9"  ry="6"  fill="rgba(255,255,255,0.18)" transform="rotate(-20 88 78)" />
      <line x1="54" y1="197" x2="146" y2="197" stroke="#8d6e4e" strokeWidth="2" strokeLinecap="round" opacity="0.36" />
      <text x="100" y="215" textAnchor="middle" fontSize="11" fill="#5a8a5a" fontFamily="Poppins,sans-serif" fontWeight="600">Young Tree · Stage 3</text>
    </svg>
  );
}

function MatureTreeIllustration() {
  return (
    <svg viewBox="0 0 240 230" width="100%" height="100%" style={{ maxHeight: 230 }}>
      <ellipse cx="120" cy="205" rx="82" ry="13" fill="#8d6e4e" opacity="0.23" />
      <rect x="111" y="110" width="18" height="95" rx="7" fill="#5d4037" />
      <path d="M111 205 Q95 194 82 200"  stroke="#5d4037" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M129 205 Q145 194 158 200" stroke="#5d4037" strokeWidth="5" fill="none" strokeLinecap="round" />
      <line x1="120" y1="148" x2="68"  y2="128" stroke="#5d4037" strokeWidth="8" strokeLinecap="round" />
      <line x1="120" y1="140" x2="172" y2="120" stroke="#5d4037" strokeWidth="7" strokeLinecap="round" />
      <line x1="120" y1="130" x2="86"  y2="105" stroke="#5d4037" strokeWidth="5" strokeLinecap="round" />
      <line x1="120" y1="128" x2="154" y2="103" stroke="#5d4037" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="120" cy="138" rx="70" ry="42" fill="#2e7d32" opacity="0.58" />
      <ellipse cx="120" cy="118" rx="62" ry="38" fill="#388e3c" opacity="0.68" />
      <ellipse cx="120" cy="98"  rx="52" ry="34" fill="#43a047" opacity="0.80" />
      <ellipse cx="120" cy="80"  rx="42" ry="28" fill="#4caf50" opacity="0.90" />
      <ellipse cx="120" cy="65"  rx="30" ry="22" fill="#66bb6a" />
      <ellipse cx="64"  cy="118" rx="28" ry="20" fill="#2e7d32" opacity="0.76" />
      <ellipse cx="176" cy="110" rx="26" ry="19" fill="#388e3c" opacity="0.73" />
      <ellipse cx="82"  cy="98"  rx="22" ry="16" fill="#43a047" opacity="0.78" />
      <ellipse cx="158" cy="94"  rx="20" ry="15" fill="#43a047" opacity="0.78" />
      <ellipse cx="104" cy="62"  rx="11" ry="7"  fill="rgba(255,255,255,0.19)" transform="rotate(-20 104 62)" />
      {[[52,90],[178,86],[48,120],[185,115]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx="7" ry="4" fill="#81c784" opacity="0.52" transform={`rotate(${i*25-20} ${x} ${y})`} />
      ))}
      <line x1="58" y1="206" x2="182" y2="206" stroke="#8d6e4e" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
      <text x="120" y="225" textAnchor="middle" fontSize="11" fill="#5a8a5a" fontFamily="Poppins,sans-serif" fontWeight="600">Mature Tree · Stage 4</text>
    </svg>
  );
}

function TreeIllustration({ months }) {
  if (months <  3)  return <SeedlingIllustration />;
  if (months < 12)  return <SaplingIllustration />;
  if (months < 36)  return <YoungTreeIllustration />;
  return <MatureTreeIllustration />;
}

/* ─────────────────────────────────────────────
   PAGE CSS
───────────────────────────────────────────── */
const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#f0f7f2; --green:#0f9d58; --green2:#0a7d44;
    --dark:#052a18; --card:#ffffff; --border:#e2f0e8; --text:#111827; --muted:#6b7280;
  }
  body { font-family:'Poppins',sans-serif !important; background:var(--bg); }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
  @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(15,157,88,0.4)} 50%{box-shadow:0 0 0 10px rgba(15,157,88,0)} }
  @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes grow    { from{transform:scaleY(0)} to{transform:scaleY(1)} }

  .fu  { animation:fadeUp  0.55s ease both; }
  .fu1 { animation:fadeUp  0.55s 0.08s ease both; }
  .fu2 { animation:fadeUp  0.55s 0.16s ease both; }
  .fu3 { animation:fadeUp  0.55s 0.24s ease both; }
  .fu4 { animation:fadeUp  0.55s 0.32s ease both; }
  .fu5 { animation:fadeUp  0.55s 0.40s ease both; }
  .sci { animation:scaleIn 0.60s 0.10s ease both; }

  .hbar-bg { background:#e5e7eb; border-radius:9999px; height:8px; overflow:hidden; }
  .hbar    { height:100%; border-radius:9999px; transform-origin:left;
             animation:grow 1.4s cubic-bezier(.22,1,.36,1) both; }

  .skel { background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);
    background-size:200% auto; animation:shimmer 1.4s linear infinite; border-radius:10px; }

  .metric-card { background:#fff; border-radius:20px; border:1px solid var(--border);
    padding:22px 24px; transition:transform 0.22s,box-shadow 0.22s; }
  .metric-card:hover { transform:translateY(-5px); box-shadow:0 20px 48px rgba(15,157,88,0.12); }

  .info-row { display:flex; justify-content:space-between; align-items:center;
    padding:13px 0; border-bottom:1px solid #f3f4f6; }
  .info-row:last-child { border-bottom:none; }

  .photo-item { border-radius:14px; overflow:hidden; border:1px solid var(--border);
    transition:transform 0.22s,box-shadow 0.22s; }
  .photo-item:hover { transform:translateY(-4px); box-shadow:0 16px 36px rgba(0,0,0,0.13); }
  .photo-ov { position:absolute; bottom:0; left:0; right:0;
    background:linear-gradient(0deg,rgba(5,42,24,0.88) 0%,transparent 100%);
    padding:14px 12px 10px; }

  .back-btn { display:inline-flex; align-items:center; gap:7px;
    background:rgba(255,255,255,0.13); backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,0.22); border-radius:100px;
    padding:8px 18px; color:rgba(255,255,255,0.88); cursor:pointer;
    font-family:'Poppins',sans-serif; font-size:13px; font-weight:600;
    transition:all 0.22s; text-decoration:none; }
  .back-btn:hover { background:rgba(255,255,255,0.24); border-color:rgba(255,255,255,0.40); }

  @media(max-width:900px){
    .two-col      { grid-template-columns:1fr !important; }
    .photo-grid   { grid-template-columns:repeat(2,1fr) !important; }
    .metrics-grid { grid-template-columns:repeat(2,1fr) !important; }
  }
  @media(max-width:540px){
    .photo-grid   { grid-template-columns:1fr !important; }
    .metrics-grid { grid-template-columns:1fr !important; }
  }
`;

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function TreeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const treeId = params?.id;

  const [tree,    setTree]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }

      try {
        const res = await fetch(`${API}/trees/${treeId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) { router.push("/login"); return; }
        if (res.status === 404) { setError("Tree not found."); setLoading(false); return; }

        const json = await res.json();
        setTree(json);
      } catch {
        // API unreachable — use single demo tree
        setTree(MOCK_TREE);
      } finally {
        setLoading(false);
      }
    })();
  }, [treeId]);

  /* ── Loading skeleton ── */
  if (loading) return (
    <>
      <style>{PAGE_CSS}</style>
      <div style={{ background: "var(--dark)", height: 300 }} />
      <div style={{ maxWidth: 1100, margin: "-60px auto 0", padding: "0 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24 }}>
          <div className="skel" style={{ height: 380, borderRadius: 24 }} />
          <div>
            {[220, 120, 90, 90, 90].map((w, i) => (
              <div key={i} className="skel" style={{ height: i === 0 ? 38 : 20, width: `min(${w}px,100%)`, marginBottom: 18 }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );

  /* ── Error state ── */
  if (error) return (
    <>
      <style>{PAGE_CSS}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 16 }}>{error}</h2>
          <button
            onClick={() => router.back()}
            style={{ background: "var(--green)", border: "none", color: "#fff", borderRadius: 100, padding: "10px 24px", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >← Go Back</button>
        </div>
      </div>
    </>
  );

  if (!tree) return null;

  /* ── All derived values come from plantation_date — never hardcoded ── */
  const { days, months, o2, co2, ageStr } = calcImpact(tree.plantation_date);
  const { stage, label: stageLabel, desc: stageDesc } = getGrowthStage(months);
  const hc = hColor(tree.health || 75);
  const hl = hLabel(tree.health || 75);

  return (
    <>
      <style>{PAGE_CSS}</style>

      {/* ════ HERO ════ */}
      <div style={{
        background: "linear-gradient(145deg,#052a18 0%,#0a4d2e 35%,#0f7a44 70%,#15b05e 100%)",
        padding: "80px 24px 110px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.06) 1.5px,transparent 1.5px)",
          backgroundSize: "32px 32px" }} />
        <div style={{ position: "absolute", top: -70, right: -70, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(30,204,110,0.16) 0%,transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(30,204,110,0.10) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <button className="back-btn fu" onClick={() => router.back()} style={{ marginBottom: 30 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Dashboard
          </button>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            {/* Icon */}
            <div className="fu1" style={{ width: 60, height: 60, borderRadius: 18, flexShrink: 0, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.20)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>🌳</div>

            {/* Name + meta */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="fu1" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 10, background: "rgba(30,204,110,0.14)", backdropFilter: "blur(10px)", border: "1px solid rgba(30,204,110,0.28)", borderRadius: 100, padding: "4px 14px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite", display: "inline-block" }} />
                <span style={{ fontSize: 10.5, color: "#a7f3d0", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{tree.tree_id || `ECO-${treeId}`}</span>
              </div>

              <h1 className="fu2" style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.08, marginBottom: 8 }}>
                {tree.tree_name}
                <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.40)", fontSize: "clamp(15px,2.5vw,22px)", marginLeft: 14 }}>· {tree.tree_species}</span>
              </h1>

              <div className="fu3" style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
                {[
                  { icon: "📍", text: tree.location },
                  { icon: "📅", text: `Planted ${new Date(tree.plantation_date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}` },
                  { icon: "⏱️", text: `Age: ${ageStr}` },
                ].map(({ icon, text }) => (
                  <span key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                    <span>{icon}</span>{text}
                  </span>
                ))}
              </div>
            </div>

            {/* Health badge */}
            <div className="fu4" style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 18, padding: "16px 22px", textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Health</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: hc, letterSpacing: "-1px", lineHeight: 1 }}>{tree.health || 75}%</div>
              <div style={{ fontSize: 12, color: hc, fontWeight: 700, marginTop: 4 }}>{hl}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <div style={{ maxWidth: 1100, margin: "-56px auto 0", padding: "0 24px 80px", position: "relative", zIndex: 2 }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 22 }}>

          {/* ── LEFT: Growth illustration ── */}
          <div>
            <div className="sci" style={{ background: "linear-gradient(160deg,#e8f5e9,#c8e6c9,#a5d6a7)", borderRadius: 24, border: "1px solid rgba(15,122,68,0.16)", padding: "32px 24px 16px", marginBottom: 18, boxShadow: "0 8px 32px rgba(10,77,46,0.11)", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Stage progress */}
              <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
                {[1,2,3,4].map(s => (
                  <div key={s} style={{ height: 4, borderRadius: 9999, width: s === stage ? 30 : 12, background: s === stage ? "#0a4d2e" : "rgba(10,77,46,0.18)", transition: "all 0.3s" }} />
                ))}
              </div>
              {/* Floating tree */}
              <div style={{ width: "100%", maxWidth: 240, animation: "floatY 5s ease-in-out infinite" }}>
                <TreeIllustration months={months} />
              </div>
              {/* Stage label */}
              <div style={{ marginTop: 8, background: "rgba(10,77,46,0.10)", borderRadius: 12, padding: "10px 18px", textAlign: "center", width: "100%" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#0a4d2e", marginBottom: 3 }}>{stageLabel}</div>
                <div style={{ fontSize: 12, color: "#4a7c59", fontWeight: 400 }}>{stageDesc}</div>
              </div>
            </div>

            {/* Stage timeline */}
            <div className="fu3" style={{ background: "#fff", borderRadius: 18, border: "1px solid var(--border)", padding: "18px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Growth Timeline</div>
              {[
                { s: 1, label: "Seedling",   range: "0 – 3 months",  emoji: "🌱" },
                { s: 2, label: "Sapling",    range: "3 – 12 months", emoji: "🌿" },
                { s: 3, label: "Young Tree", range: "1 – 3 years",   emoji: "🌲" },
                { s: 4, label: "Mature",     range: "3+ years",      emoji: "🌳" },
              ].map(({ s, label, range, emoji }) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: s < 4 ? "1px solid #f3f4f6" : "none", opacity: s === stage ? 1 : 0.48 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: s === stage ? "linear-gradient(135deg,#0a4d2e,#0f7a44)" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: s === stage ? 700 : 500, color: s === stage ? "#0a1a0a" : "#6b7280" }}>{label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{range}</div>
                  </div>
                  {s === stage && <div style={{ fontSize: 10.5, fontWeight: 700, color: "#0f9d58", background: "rgba(15,157,88,0.10)", padding: "2px 9px", borderRadius: 9999 }}>Now</div>}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Metrics + Info ── */}
          <div>
            {/* Impact cards — values computed from plantation_date */}
            <div className="fu1" style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Environmental Impact</div>
              <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>

                <div className="metric-card" style={{ borderTop: "3px solid #0f9d58" }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>💨</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>Oxygen Produced</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", letterSpacing: "-1px", lineHeight: 1 }}>
                    {o2} <span style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af" }}>kg</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>over {days} days</div>
                  <div style={{ fontSize: 11, color: "#0f9d58", fontWeight: 600, marginTop: 2 }}>≈ {ANNUAL_O2} kg/year</div>
                </div>

                <div className="metric-card" style={{ borderTop: "3px solid #0891b2" }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>♻️</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>CO₂ Absorbed</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", letterSpacing: "-1px", lineHeight: 1 }}>
                    {co2} <span style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af" }}>kg</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>over {days} days</div>
                  <div style={{ fontSize: 11, color: "#0891b2", fontWeight: 600, marginTop: 2 }}>≈ {ANNUAL_CO2} kg/year</div>
                </div>

                <div className="metric-card" style={{ borderTop: "3px solid #8b5cf6" }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>⏳</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>Tree Age</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", letterSpacing: "-1px", lineHeight: 1 }}>
                    {days} <span style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af" }}>days</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>{ageStr}</div>
                  <div style={{ fontSize: 11, color: "#8b5cf6", fontWeight: 600, marginTop: 2 }}>Stage {stage}: {stageLabel}</div>
                </div>
              </div>
            </div>

            {/* Formula callout */}
            <div className="fu2" style={{ background: "linear-gradient(135deg,#f0fbf4,#e6f7ed)", border: "1px solid rgba(15,122,68,0.13)", borderRadius: 14, padding: "14px 18px", marginBottom: 18, display: "flex", gap: 11, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🧮</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0a4d2e", marginBottom: 4 }}>How we calculate</div>
                <div style={{ fontSize: 12, color: "#4a7c59", lineHeight: 1.65 }}>
                  O₂ = ({ANNUAL_O2} ÷ 365) × {days} days = <strong>{o2} kg</strong>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  CO₂ = ({ANNUAL_CO2} ÷ 365) × {days} days = <strong>{co2} kg</strong>
                </div>
              </div>
            </div>

            {/* Health bar */}
            <div className="fu2" style={{ background: "#fff", borderRadius: 18, border: "1px solid var(--border)", padding: "20px 22px", marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Tree Health Score</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: hc }}>{tree.health || 75}% — {hl}</div>
              </div>
              <div className="hbar-bg">
                <div className="hbar" style={{ width: `${tree.health || 75}%`, background: `linear-gradient(90deg,${hc},${hc}bb)` }} />
              </div>
            </div>

            {/* Plantation details table */}
            <div className="fu3" style={{ background: "#fff", borderRadius: 18, border: "1px solid var(--border)", padding: "6px 22px 10px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", padding: "16px 0 8px" }}>Plantation Details</div>
              {[
                { label: "Tree ID",             value: tree.tree_id || `ECO-${treeId}` },
                { label: "Name",                value: tree.tree_name },
                { label: "Species",             value: tree.tree_species },
                { label: "Planted On",          value: new Date(tree.plantation_date).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" }) },
                { label: "Location",            value: tree.location },
                { label: "Days Since Planted",  value: `${days} days` },
              ].map(({ label, value }) => (
                <div className="info-row" key={label}>
                  <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 13.5, color: "#111827", fontWeight: 600, textAlign: "right", maxWidth: "58%" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Worker Photos ── */}
        {tree.worker_photos?.length > 0 && (
          <div className="fu4" style={{ marginTop: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>📸 Field Reports</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>Worker Photo Feed</h3>
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{tree.worker_photos.length} photo{tree.worker_photos.length > 1 ? "s" : ""}</div>
            </div>
            <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {tree.worker_photos.map((p, i) => (
                <div key={p.id} className="photo-item fu" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div style={{ position: "relative" }}>
                    <img src={p.img} alt={p.note} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                      onError={e => { e.target.src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80"; }} />
                    <div className="photo-ov">
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12.5, color: "#fff", marginBottom: 3 }}>{p.note}</div>
                    </div>
                  </div>
                  <div style={{ padding: "10px 12px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#0f9d58,#15b05e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>👷</div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{p.worker}</span>
                    </div>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{p.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="fu5" style={{ marginTop: 28, background: "linear-gradient(145deg,#052a18,#0a4d2e,#0f7a44)", borderRadius: 22, padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.05) 1.5px,transparent 1.5px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🌿</div>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: 6 }}>Plant Another Tree</h3>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.65, maxWidth: 400 }}>Multiply your impact — every new tree adds to your living legacy.</p>
          </div>
          <a href="/" style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0a4d2e", borderRadius: 9999, padding: "13px 28px", fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.20)", whiteSpace: "nowrap" }}>Browse Trees →</a>
        </div>
      </div>
    </>
  );
}