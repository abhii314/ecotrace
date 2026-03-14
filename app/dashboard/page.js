"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";   // ← same alias used everywhere

/* ─────────────────────────────────────────────
   Compute O₂ & CO₂ from a plantation_date
   so dashboard stat cards are never hardcoded
───────────────────────────────────────────── */
const ANNUAL_O2  = 110; // kg/year
const ANNUAL_CO2 = 22;  // kg/year

function computeFromDate(dateStr) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(dateStr)) / 86400000));
  return {
    o2:  parseFloat(((ANNUAL_O2  / 365) * days).toFixed(1)),
    co2: parseFloat(((ANNUAL_CO2 / 365) * days).toFixed(1)),
    months: Math.floor(days / 30.44),
  };
}

/* ─────────────────────────────────────────────
   MOCK — 1 tree, 1 payment.
   All O₂ / CO₂ values are derived at runtime.
───────────────────────────────────────────── */
const PLANTATION_DATE = "2025-01-15";

const { o2: DEMO_O2, co2: DEMO_CO2, months: DEMO_MONTHS } = computeFromDate(PLANTATION_DATE);

const MOCK = {
  user: { name: "Aditya Tekumalla", email: "aditya@ecotrace.com" },

  /* ── Stat card values ── */
  trees_planted: 4,
  oxygen_generated: DEMO_O2 * 4,
  carbon_offset: DEMO_CO2 * 4,
  payments: 1,

  /* ── Demo trees ── */
  trees: [
    {
      id: 1,
      name: "Hari",
      species: "Neem Tree",
      age_months: DEMO_MONTHS,
      health: 88,
      location: "Hyderabad, TG",
      status: "Thriving",
      planted: "Jan 15, 2025",
    },
    {
      id: 2,
      name: "Ganga",
      species: "Mango Tree",
      age_months: DEMO_MONTHS + 2,
      health: 91,
      location: "Hyderabad, TG",
      status: "Thriving",
      planted: "Nov 10, 2024",
    },
    {
      id: 3,
      name: "Arjun",
      species: "Peepal Tree",
      age_months: DEMO_MONTHS - 1,
      health: 82,
      location: "Hyderabad, TG",
      status: "Growing",
      planted: "Feb 02, 2025",
    },
    {
      id: 4,
      name: "Tulsi",
      species: "Banyan Tree",
      age_months: DEMO_MONTHS + 3,
      health: 90,
      location: "Hyderabad, TG",
      status: "Thriving",
      planted: "Oct 01, 2024",
    }
  ],

  recent_updates: [
    { id: 1, tree: "Hari (Neem Tree)", msg: "New growth photo uploaded by field worker.", time: "2 hrs ago", type: "photo", color: "#0f9d58" },
    { id: 2, tree: "Ganga (Mango Tree)", msg: "Monthly health check completed. Score: 91%.", time: "1 day ago", type: "health", color: "#f59e0b" },
    { id: 3, tree: "Arjun (Peepal Tree)", msg: "Tree reached growth milestone.", time: "3 days ago", type: "mile", color: "#8b5cf6" },
    { id: 4, tree: "Tulsi (Banyan Tree)", msg: "CO₂ absorption report generated.", time: "1 week ago", type: "report", color: "#0891b2" },
  ],

  worker_photos: [
    { id: 1, tree: "Hari (Neem Tree)", worker: "Ramesh K.", date: "Mar 13, 2026", img: "https://images.unsplash.com/photo-1601823984263-ac0580b9ac8e?w=500&q=80", note: "Healthy new leaf growth observed." },
    { id: 2, tree: "Ganga (Mango Tree)", worker: "Suresh P.", date: "Feb 20, 2026", img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&q=80", note: "Good canopy spread, soil moisture normal." }
  ],

};

/* ─────────────────────────────────────────────
   PAGE CSS
───────────────────────────────────────────── */
const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#f0f7f2; --sidebar:#052a18; --card:#ffffff;
    --green:#0f9d58; --green2:#0a7d44; --muted:#6b7280; --border:#e2f0e8; --text:#111827;
  }
  body { font-family:'Poppins',sans-serif !important; background:var(--bg); color:var(--text); }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(15,157,88,0.45)} 50%{box-shadow:0 0 0 10px rgba(15,157,88,0)} }
  @keyframes sway    { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
  @keyframes grow    { from{transform:scaleY(0)} to{transform:scaleY(1)} }
  @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes leaffall{ 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(120px) rotate(180deg);opacity:0} }

  .fu  { animation:fadeUp 0.6s ease both; }
  .fu1 { animation:fadeUp 0.6s 0.07s ease both; }
  .fu2 { animation:fadeUp 0.6s 0.14s ease both; }
  .fu3 { animation:fadeUp 0.6s 0.21s ease both; }

  .sidebar { width:240px; min-height:100vh; background:var(--sidebar); flex-shrink:0;
    display:flex; flex-direction:column; position:sticky; top:0; height:100vh; overflow-y:auto; }
  .snl { display:flex; align-items:center; gap:12px; padding:11px 20px; border-radius:10px;
    margin:2px 10px; font-size:13.5px; font-weight:500; color:rgba(255,255,255,0.55);
    cursor:pointer; transition:all 0.18s; }
  .snl:hover { background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.90); }
  .snl.active { background:rgba(15,157,88,0.22); color:#fff; font-weight:600; }

  .stat-card { background:var(--card); border-radius:18px; padding:22px 24px;
    border:1px solid var(--border); transition:transform 0.22s,box-shadow 0.22s; }
  .stat-card:hover { transform:translateY(-4px); box-shadow:0 18px 44px rgba(15,157,88,0.12); }

  .tree-card { background:var(--card); border-radius:20px; overflow:hidden;
    border:1px solid var(--border); transition:transform 0.28s,box-shadow 0.28s;
    cursor:pointer; display:flex; flex-direction:column; }
  .tree-card:hover { transform:translateY(-6px); box-shadow:0 22px 52px rgba(15,157,88,0.16); }
  .tree-card:hover .view-strip { background:#f0fdf4; color:#0a7d44; }

  .view-strip { display:flex; align-items:center; justify-content:center; gap:6px;
    padding:12px 18px; border-top:1px solid #f3f4f6;
    font-size:13px; font-weight:700; color:#0f9d58; transition:background 0.18s,color 0.18s; }

  .hbar-bg { background:#e5e7eb; border-radius:9999px; height:8px; overflow:hidden; }
  .hbar { height:100%; border-radius:9999px; transform-origin:left; animation:grow 1.2s cubic-bezier(.22,1,.36,1) both; }

  .photo-card { border-radius:16px; overflow:hidden; border:1px solid var(--border);
    transition:transform 0.22s,box-shadow 0.22s; }
  .photo-card:hover { transform:translateY(-4px); box-shadow:0 18px 44px rgba(0,0,0,0.14); }
  .photo-ov { position:absolute; bottom:0; left:0; right:0;
    background:linear-gradient(0deg,rgba(5,42,24,0.85) 0%,transparent 100%);
    padding:16px 14px 12px; }

  .tree-canvas { border-radius:20px 20px 0 0; background:linear-gradient(160deg,#e8f5e9,#c8e6c9,#a5d6a7);
    display:flex; align-items:flex-end; justify-content:center; overflow:hidden; position:relative; }

  .upd-item { display:flex; gap:12px; padding:14px 0; border-bottom:1px solid var(--border); }
  .upd-item:last-child { border-bottom:none; }
  .upd-dot { width:10px; height:10px; border-radius:50%; margin-top:5px; flex-shrink:0; animation:pulse 2.5s infinite; }

  .skel { background:linear-gradient(90deg,#e5e7eb 25%,#f3f4f6 50%,#e5e7eb 75%);
    background-size:200% auto; animation:shimmer 1.4s linear infinite; border-radius:8px; }

  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-thumb { background:rgba(15,157,88,0.25); border-radius:9999px; }

  @media(max-width:900px){
    .sidebar{display:none;}
    .stat-grid{grid-template-columns:repeat(2,1fr)!important;}
    .tree-grid{grid-template-columns:repeat(2,1fr)!important;}
    .photo-grid{grid-template-columns:repeat(2,1fr)!important;}
    .ov-two{grid-template-columns:1fr!important;}
  }
  @media(max-width:540px){
    .stat-grid{grid-template-columns:1fr!important;}
    .tree-grid{grid-template-columns:1fr!important;}
    .photo-grid{grid-template-columns:repeat(2,1fr)!important;}
  }
`;

/* ── SVG Tree ── */
function TreeSVG({ ageMonths, health }) {
  const young = ageMonths < 6, mid = ageMonths >= 6 && ageMonths < 18, mature = ageMonths >= 18;
  const trunkH = young ? 40 : mid ? 70 : 100;
  const c1 = young ? 36 : mid ? 60 : 90;
  const c2 = young ? 28 : mid ? 50 : 74;
  const c3 = young ? 20 : mid ? 38 : 56;
  const leaves = health > 80 ? "#2e7d32" : health > 60 ? "#558b2f" : "#827717";
  const trunk = "#5d4037", cx = 100, base = 195;
  return (
    <svg viewBox="0 0 200 210" width="100%" height="100%" style={{ maxHeight: 210 }}>
      <ellipse cx={cx} cy={base + 4} rx={30} ry={7} fill="rgba(0,0,0,0.10)" />
      <rect x={cx - 7} y={base - trunkH} width={14} height={trunkH} rx={5} fill={trunk} />
      <ellipse cx={cx} cy={base - trunkH + 10} rx={c1} ry={c1 * 0.62} fill={leaves} opacity={0.7} />
      <ellipse cx={cx} cy={base - trunkH - 10} rx={c2} ry={c2 * 0.65} fill={leaves} opacity={0.85} />
      <ellipse cx={cx} cy={base - trunkH - 30} rx={c3} ry={c3 * 0.70} fill={leaves} />
      <ellipse cx={cx - 10} cy={base - trunkH - 32} rx={c3 * 0.4} ry={c3 * 0.28} fill="rgba(255,255,255,0.18)" />
      {mature && (
        <g style={{ transformOrigin: `${cx}px ${base}px`, animation: "sway 5s ease-in-out infinite" }}>
          <line x1={cx - 20} y1={base - trunkH + 5} x2={cx - 50} y2={base - trunkH + 25} stroke={trunk} strokeWidth={4} strokeLinecap="round" />
          <line x1={cx + 18} y1={base - trunkH + 8} x2={cx + 46} y2={base - trunkH + 28} stroke={trunk} strokeWidth={3.5} strokeLinecap="round" />
          <ellipse cx={cx - 46} cy={base - trunkH + 20} rx={22} ry={18} fill={leaves} opacity={0.80} />
          <ellipse cx={cx + 44} cy={base - trunkH + 24} rx={20} ry={16} fill={leaves} opacity={0.80} />
        </g>
      )}
      <text x={cx} y={base + 18} textAnchor="middle" fontSize="11" fill="#555" fontFamily="Poppins,sans-serif" fontWeight="600">
        {ageMonths < 12 ? `${ageMonths}mo old` : `${(ageMonths / 12).toFixed(1)} yr old`}
      </text>
    </svg>
  );
}

const hColor = h => h >= 85 ? "#0f9d58" : h >= 65 ? "#f59e0b" : "#ef4444";
const hLabel = h => h >= 85 ? "Thriving" : h >= 65 ? "Growing" : "Needs care";

/* ── Sidebar ── */
const NAV = [
  { icon: "🏠", label: "Overview", id: "overview" },
  { icon: "🌳", label: "My Trees", id: "trees" },
  { icon: "📸", label: "Photo Feed", id: "photos" },
  { icon: "📊", label: "Impact", id: "impact" },
  { icon: "🔔", label: "Updates", id: "updates" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

function Sidebar({ active, setActive, user, onLogout }) {
  return (
    <div className="sidebar">
      <div style={{ padding: "22px 20px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#0f9d58,#0a7d44)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌱</div>
        <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 17, color: "#fff" }}>EcoTrace</span>
      </div>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#0f9d58,#15b05e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, animation: "pulse 3s infinite" }}>👤</div>
          <div>
            <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name || "My Account"}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 2 }}>Individual</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "10px 0" }}>
        {NAV.map(n => (
          <div key={n.id} className={"snl" + (active === n.id ? " active" : "")} onClick={() => setActive(n.id)}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}
          </div>
        ))}
      </nav>
      <div style={{ padding: "14px 10px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="snl" onClick={onLogout} style={{ color: "#f87171" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>Sign out
        </div>
      </div>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ icon, label, value, sub, color, delay = 0 }) {
  return (
    <div className="stat-card fu" style={{ animationDelay: `${delay}s` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, marginTop: 6, animation: "pulse 2.5s infinite" }} />
      </div>
      <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 900, color: "#111827", letterSpacing: "-1px", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ── Tree Card — CLICKABLE ── */
function TreeCard({ tree, idx, onClickTree }) {
  const hc = hColor(tree.health);
  return (
    <div className="tree-card fu" style={{ animationDelay: `${idx * 0.07}s` }} onClick={() => onClickTree(tree.id)}>
      <div className="tree-canvas" style={{ height: 200, position: "relative" }}>
        <TreeSVG ageMonths={tree.age_months} health={tree.health} />
        <div style={{ position: "absolute", top: 12, right: 12, background: `${hc}22`, border: `1px solid ${hc}44`, color: hc, fontSize: 10.5, fontWeight: 700, padding: "3px 10px", borderRadius: 9999 }}>{hLabel(tree.health)}</div>
        {tree.health > 85 && [0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", fontSize: 14, opacity: 0.7, top: `${15 + i * 20}%`, left: `${10 + i * 25}%`, animation: `leaffall ${2.5 + i}s ease-in ${i * 0.8}s infinite` }}>🍃</div>
        ))}
      </div>
      <div style={{ padding: "16px 18px 14px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", letterSpacing: "-0.2px" }}>{tree.name}</h3>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{tree.species}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>📍 {tree.location}</div>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", background: "#f3f4f6", padding: "3px 9px", borderRadius: 8, flexShrink: 0, whiteSpace: "nowrap" }}>Planted {tree.planted}</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11.5, color: "#6b7280", fontWeight: 600 }}>Health</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: hc }}>{tree.health}%</span>
          </div>
          <div className="hbar-bg"><div className="hbar" style={{ width: `${tree.health}%`, background: `linear-gradient(90deg,${hc},${hc}bb)` }} /></div>
        </div>
        {/* Live computed stats — not hardcoded */}
        <div style={{ display: "flex", gap: 8 }}>
          {(() => {
            const { o2, co2 } = computeFromDate(PLANTATION_DATE);
            return [
              { icon: "🌬️", label: `${tree.age_months}mo` },
              { icon: "💨", label: `${o2}kg O₂` },
              { icon: "♻️", label: `${co2}kg CO₂` },
            ];
          })().map(s => (
            <div key={s.label} style={{ flex: 1, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 9, padding: "6px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 13 }}>{s.icon}</div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: "#374151", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="view-strip">
        View Full Details
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}

/* ── Photo Card ── */
function PhotoCard({ p, idx }) {
  return (
    <div className="photo-card fu" style={{ animationDelay: `${idx * 0.07}s` }}>
      <div style={{ position: "relative" }}>
        <img src={p.img} alt={p.tree} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80"; }} />
        <div className="photo-ov">
          <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 13.5, color: "#fff", marginBottom: 3 }}>{p.tree}</div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.70)" }}>{p.note}</div>
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
  );
}

/* ── Update Item ── */
function UpdateItem({ u }) {
  const icons = { photo: "📸", health: "💊", mile: "🏆", alert: "⚠️", report: "📄" };
  return (
    <div className="upd-item">
      <div className="upd-dot" style={{ background: u.color }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 13 }}>{icons[u.type] || "📌"}</span>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#111827" }}>{u.tree}</span>
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.55 }}>{u.msg}</div>
        <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 4 }}>{u.time}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState({
    trees_planted: 0, carbon_offset: 0, oxygen_generated: 0, payments: 0,
    trees: [], recent_updates: [], worker_photos: [], user: {},
  });
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("overview");

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
  
      try {
        const res = await fetch(`${API}/dashboard/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (res.status === 401) {
          router.push("/login");
          return;
        }
  
        const json = await res.json();
  
        /* 
           Fix: If no trees are adopted, CO2 and O2 must be 0
        */
        const trees = json.trees_planted ?? MOCK.trees_planted;
  
        const apiO2 = trees > 0
          ? (json.oxygen_generated ?? MOCK.oxygen_generated)
          : 0;
  
        const apiCO2 = trees > 0
          ? (json.carbon_offset ?? MOCK.carbon_offset)
          : 0;
  
        setData({
          ...MOCK,
          ...json,
          trees_planted: trees,
          oxygen_generated: apiO2,
          carbon_offset: apiCO2,
        });
  
      } catch (error) {
        setData(MOCK);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    router.push("/");
  };

  const handleTreeClick = (treeId) => {
    router.push(`/dashboard/tree/${treeId}`);
  };

  if (loading) return (
    <>
      <style>{PAGE_CSS}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div className="sidebar" />
        <div style={{ flex: 1, padding: "36px 32px" }}>
          <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
            {[0, 1, 2, 3].map(i => <div key={i} className="skel" style={{ height: 110 }} />)}
          </div>
          {[1, 2, 3].map(i => <div key={i} className="skel" style={{ height: 18, marginBottom: 14, width: `${80 - i * 10}%` }} />)}
        </div>
      </div>
    </>
  );

  const s = activeNav;

  return (
    <>
      <style>{PAGE_CSS}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
        <Sidebar active={activeNav} setActive={setActiveNav} user={data?.user} onLogout={handleLogout} />

        <div style={{ flex: 1, overflow: "auto" }}>
          {/* Top bar */}
          <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
            <div>
              <span style={{ fontSize: 14, color: "#9ca3af" }}>Dashboard</span>
              <span style={{ fontSize: 14, color: "#9ca3af", margin: "0 6px" }}>/</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", textTransform: "capitalize" }}>{activeNav}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: "#ef4444", color: "#fff", fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{data?.recent_updates?.length || 0}</span>
              </div>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#0f9d58,#15b05e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, cursor: "pointer" }}>👤</div>
            </div>
          </div>

          <div style={{ padding: "32px 32px 56px" }}>

            {/* OVERVIEW */}
            {s === "overview" && (
              <div>
                <div style={{ marginBottom: 26 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>Overview</h2>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Your green impact at a glance</p>
                </div>
                <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                  <StatCard icon="🌳" label="Trees Adopted"    value={data.trees_planted}                        sub="trees"        color="#0f9d58" delay={0}    />
                  <StatCard icon="♻️" label="CO₂ Offset"      value={`${data.carbon_offset} kg`}               sub="since planting" color="#0891b2" delay={0.06} />
                  <StatCard icon="💨" label="Oxygen Generated" value={`${data.oxygen_generated} kg`}            sub="since planting" color="#8b5cf6" delay={0.12} />
                  <StatCard icon="💳" label="Total Payments"   value={data.payments}                            sub="transactions"   color="#f59e0b" delay={0.18} />
                </div>
                <div className="ov-two" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
                  <div style={{ background: "#fff", borderRadius: 18, padding: "22px 24px", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "#111827" }}>Recent Updates</h3>
                      <span style={{ fontSize: 12, color: "#0f9d58", fontWeight: 600, cursor: "pointer" }} onClick={() => setActiveNav("updates")}>View all →</span>
                    </div>
                    {data.recent_updates.slice(0, 4).map(u => <UpdateItem key={u.id} u={u} />)}
                  </div>
                  <div style={{ background: "linear-gradient(145deg,#052a18,#0a4d2e,#0f7a44)", borderRadius: 18, padding: "26px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(30,204,110,0.12)", pointerEvents: "none" }} />
                    <div>
                      <div style={{ fontSize: 34, marginBottom: 12 }}>🌿</div>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: 10 }}>Plant Another Tree</h3>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", lineHeight: 1.70 }}>Every tree expands your legacy and helps communities breathe cleaner air.</p>
                    </div>
                    <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0a4d2e", borderRadius: 9999, padding: "11px 22px", marginTop: 20, fontWeight: 700, fontSize: 13.5, textDecoration: "none", boxShadow: "0 6px 20px rgba(0,0,0,0.20)", width: "fit-content" }}>Browse Trees →</a>
                  </div>
                </div>
              </div>
            )}

            {/* MY TREES */}
            {s === "trees" && (
              <div>
                <div style={{ marginBottom: 26 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>My Trees</h2>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Click any tree to view full details, growth stage & impact</p>
                </div>
                <div className="tree-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
                  {data.trees.map((t, i) => (
                    <TreeCard key={t.id} tree={t} idx={i} onClickTree={handleTreeClick} />
                  ))}
                </div>
              </div>
            )}

            {/* PHOTOS */}
            {s === "photos" && (
              <div>
                <div style={{ marginBottom: 26 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>Worker Photo Feed</h2>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Latest field photos uploaded by tree workers</p>
                </div>
                <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
                  {data.worker_photos.map((p, i) => <PhotoCard key={p.id} p={p} idx={i} />)}
                </div>
              </div>
            )}

            {/* IMPACT */}
            {s === "impact" && (
              <div>
                <div style={{ marginBottom: 26 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>My Impact</h2>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Total environmental contribution from your trees</p>
                </div>
                <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
                  <StatCard icon="🌳" label="Trees Adopted"    value={data.trees_planted}              sub="trees"          color="#0f9d58" />
                  <StatCard icon="♻️" label="CO₂ Absorbed"    value={`${data.carbon_offset} kg`}      sub="since planting" color="#0891b2" />
                  <StatCard icon="💨" label="Oxygen Generated" value={`${data.oxygen_generated} kg`}   sub="since planting" color="#8b5cf6" />
                  <StatCard icon="💳" label="Payments Made"   value={data.payments}                    sub="transactions"   color="#f59e0b" />
                </div>
                <div style={{ background: "#fff", borderRadius: 18, padding: "24px 26px", border: "1px solid var(--border)" }}>
                  <h3 style={{ fontSize: 15.5, fontWeight: 700, color: "#111827", marginBottom: 20 }}>CO₂ Reduction by Tree</h3>
                  {data.trees.map(t => {
                    const { co2 } = computeFromDate(PLANTATION_DATE);
                    const max = ANNUAL_CO2;
                    return (
                      <div key={t.id} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{t.name} ({t.species})</span>
                          <span style={{ fontSize: 13, color: "#0f9d58", fontWeight: 700 }}>{co2} kg CO₂</span>
                        </div>
                        <div className="hbar-bg">
                          <div className="hbar" style={{ width: `${Math.min((co2 / max) * 100, 100)}%`, background: "linear-gradient(90deg,#0f9d58,#15b05e)" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* UPDATES */}
            {s === "updates" && (
              <div>
                <div style={{ marginBottom: 26 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>All Updates</h2>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Full activity history</p>
                </div>
                <div style={{ background: "#fff", borderRadius: 18, padding: "6px 24px 10px", border: "1px solid var(--border)" }}>
                  {data.recent_updates.map(u => <UpdateItem key={u.id} u={u} />)}
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {s === "settings" && (
              <div>
                <div style={{ marginBottom: 26 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>Settings</h2>
                  <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 4 }}>Manage your account preferences</p>
                </div>
                <div style={{ background: "#fff", borderRadius: 18, padding: "28px", border: "1px solid var(--border)", maxWidth: 500 }}>
                  {[
                    { label: "Full Name", val: data.user?.name  || "" },
                    { label: "Email",     val: data.user?.email || "" },
                    { label: "Phone",     val: "+91 98765 43210" },
                  ].map(f => (
                    <div key={f.label} style={{ marginBottom: 18 }}>
                      <label style={{ fontSize: 12.5, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6 }}>{f.label}</label>
                      <input defaultValue={f.val} style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontFamily: "'Poppins',sans-serif", fontSize: 14, color: "#111827", outline: "none" }} />
                    </div>
                  ))}
                  <button style={{ background: "linear-gradient(135deg,#0f9d58,#0a7d44)", color: "#fff", border: "none", borderRadius: 9999, padding: "12px 28px", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 20px rgba(15,157,88,0.28)" }}>Save Changes</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}