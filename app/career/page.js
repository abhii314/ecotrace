"use client"

import { useState } from "react"
import Layout from "@/components/Layout"

// ─── Data ──────────────────────────────────────────────────────────────────

const ROLES = [
  {
    id: 1,
    title: "Tree Plantation Field Worker",
    description:
      "Lead on-ground planting operations across designated forest zones. Work with local teams to ensure seedling survival and soil preparation.",
    location: "Hyderabad, Telangana",
    type: "Field",
    level: "Entry Level",
    dept: "Field Operations",
    icon: "🌱",
  },
  {
    id: 2,
    title: "Forest Monitoring Specialist",
    description:
      "Monitor tree health metrics, growth data, and ecosystem indicators. Compile field reports and liaise with our data platform team.",
    location: "Bengaluru, Karnataka",
    type: "Hybrid",
    level: "Mid Level",
    dept: "Monitoring & Analytics",
    icon: "🔬",
  },
  {
    id: 3,
    title: "Community Outreach Coordinator",
    description:
      "Engage local communities, NGOs, and schools in tree adoption initiatives. Coordinate events, workshops, and partnerships.",
    location: "Delhi, NCR",
    type: "Hybrid",
    level: "Entry Level",
    dept: "Community & Impact",
    icon: "🤝",
  },
  {
    id: 4,
    title: "Field Operations Manager",
    description:
      "Oversee multi-region plantation drives, manage field teams, and ensure project milestones align with environmental targets.",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    level: "Senior Level",
    dept: "Field Operations",
    icon: "🗂️",
  },
]

const TYPE_COLORS = {
  "Field":     { bg: "rgba(30,204,110,0.10)", text: "#0a4d2e", border: "rgba(15,122,68,0.25)" },
  "Full-time": { bg: "rgba(30,204,110,0.10)", text: "#0a4d2e", border: "rgba(15,122,68,0.25)" },
  "Hybrid":    { bg: "rgba(255,186,0,0.10)",  text: "#7a4f00", border: "rgba(180,110,0,0.20)" },
}

const LEVEL_COLORS = {
  "Entry Level":  { bg: "rgba(30,204,110,0.08)", text: "#0a4d2e" },
  "Mid Level":    { bg: "rgba(15,122,68,0.10)",  text: "#0a4d2e" },
  "Senior Level": { bg: "rgba(10,77,46,0.12)",   text: "#052a18" },
}

const PERKS = [
  {
    emoji: "🌳",
    title: "Large-Scale Restoration",
    desc: "Contribute to planting millions of trees across India's most ecologically critical zones.",
  },
  {
    emoji: "🔬",
    title: "Work With Scientists",
    desc: "Collaborate with environmental scientists, ecologists, and field experts on real conservation missions.",
  },
  {
    emoji: "📊",
    title: "Measurable Impact",
    desc: "Track CO₂ offset and oxygen generation data — see the direct results of your work every day.",
  },
  {
    emoji: "🌿",
    title: "Purpose-Driven Culture",
    desc: "Every role at EcoTrace is tied directly to restoring India's green cover for future generations.",
  },
]

// ─── Badge ─────────────────────────────────────────────────────────────────

function Badge({ label, style }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: "10.5px", fontWeight: 600,
      padding: "3px 11px", borderRadius: 100,
      letterSpacing: "0.05em", textTransform: "uppercase",
      border: `1px solid ${style.border || "transparent"}`,
      background: style.bg, color: style.text,
      fontFamily: "'Poppins', sans-serif",
    }}>
      {label}
    </span>
  )
}

// ─── Role Card ─────────────────────────────────────────────────────────────

function RoleCard({ role, onApply }) {
  const [hovered, setHovered] = useState(false)
  const typeStyle  = TYPE_COLORS[role.type]
  const levelStyle = LEVEL_COLORS[role.level]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 18,
        border: hovered ? "1.5px solid #0f7a44" : "1.5px solid #e0ece3",
        padding: "24px 24px 22px",
        display: "flex", flexDirection: "column", gap: 14,
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 14px 36px rgba(10,77,46,0.13)" : "0 2px 10px rgba(0,0,0,0.04)",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: "linear-gradient(135deg,#f0fbf4,#e2f5eb)",
          border: "1px solid rgba(15,122,68,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}>
          {role.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.10em",
            textTransform: "uppercase", color: "#0f7a44", marginBottom: 4,
            fontFamily: "'Poppins', sans-serif",
          }}>
            {role.dept}
          </div>
          <h3 style={{
            margin: 0, fontSize: 15.5, fontWeight: 700,
            color: "#0a1a0a", fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.30, letterSpacing: "-0.2px",
          }}>
            {role.title}
          </h3>
        </div>
      </div>

      <p style={{
        margin: 0, fontSize: 13, color: "#5a7a65",
        lineHeight: 1.70, fontFamily: "'Poppins', sans-serif", fontWeight: 400,
      }}>
        {role.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <Badge label={role.type}  style={typeStyle}  />
        <Badge label={role.level} style={levelStyle} />
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 12, color: "#7a9a7a", fontFamily: "'Poppins', sans-serif", fontWeight: 400,
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="5" r="2" stroke="#7a9a7a" strokeWidth="1.3"/>
            <path d="M2 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#7a9a7a" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          {role.location}
        </span>
      </div>

      <button
        onClick={() => onApply(role)}
        style={{
          marginTop: "auto",
          background: hovered ? "linear-gradient(135deg,#0a4d2e,#0f7a44)" : "linear-gradient(135deg,#f0fbf4,#e2f5eb)",
          color: hovered ? "#fff" : "#0a4d2e",
          border: `1.5px solid ${hovered ? "transparent" : "rgba(15,122,68,0.22)"}`,
          borderRadius: 100, padding: "10px 0",
          fontSize: 13.5, fontWeight: 700, cursor: "pointer",
          transition: "all 0.22s ease", fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.01em",
          boxShadow: hovered ? "0 4px 16px rgba(10,77,46,0.25)" : "none",
        }}
      >
        Apply Now →
      </button>
    </div>
  )
}

// ─── Application Modal ─────────────────────────────────────────────────────

function ApplicationModal({ role, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "",
    role: role?.title || "", experience: "", skills: "", motivation: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    border: "1.5px solid rgba(15,122,68,0.20)", borderRadius: 12,
    padding: "10px 14px", fontSize: 13.5,
    fontFamily: "'Poppins', sans-serif", color: "#0a1a0a",
    background: "#fafffe", outline: "none",
    transition: "border-color 0.2s", fontWeight: 400,
  }

  const labelStyle = {
    display: "block", fontSize: 10.5, fontWeight: 700,
    letterSpacing: "0.09em", textTransform: "uppercase",
    color: "#0f7a44", marginBottom: 6,
    fontFamily: "'Poppins', sans-serif",
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(5,42,24,0.60)", backdropFilter: "blur(5px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div style={{
        background: "#fff", borderRadius: 22,
        width: "100%", maxWidth: 560,
        maxHeight: "92vh", overflowY: "auto",
        padding: "2rem", position: "relative",
        boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "1.2rem", right: "1.2rem",
          background: "#f0fbf4", border: "1px solid rgba(15,122,68,0.18)",
          borderRadius: 10, width: 34, height: 34, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, color: "#0a4d2e", fontFamily: "'Poppins', sans-serif",
        }}>×</button>

        {!submitted ? (
          <>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.10em",
                textTransform: "uppercase", color: "#0f7a44", marginBottom: 5,
                fontFamily: "'Poppins', sans-serif",
              }}>Application Form</div>
              <h2 style={{
                margin: "0 0 4px", fontSize: 21, fontWeight: 800,
                color: "#0a1a0a", fontFamily: "'Poppins', sans-serif",
                letterSpacing: "-0.3px", lineHeight: 1.2,
              }}>{role?.title}</h2>
              <p style={{
                margin: 0, fontSize: 12.5, color: "#7a9a7a",
                fontFamily: "'Poppins', sans-serif", fontWeight: 400,
              }}>📍 {role?.location} · {role?.type}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input required style={inputStyle} placeholder="Arjun Sharma" value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input required type="email" style={inputStyle} placeholder="you@example.com" value={form.email} onChange={set("email")} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input style={inputStyle} placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label style={labelStyle}>City / State</label>
                  <input required style={inputStyle} placeholder="Hyderabad, TG" value={form.city} onChange={set("city")} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <div>
                  <label style={labelStyle}>Role Applying For</label>
                  <input required style={inputStyle} value={form.role} onChange={set("role")} />
                </div>
                <div>
                  <label style={labelStyle}>Years of Experience</label>
                  <select
                    style={{ ...inputStyle, color: form.experience ? "#0a1a0a" : "#a0b8a0" }}
                    value={form.experience} onChange={set("experience")} required
                  >
                    <option value="" disabled>Select range</option>
                    <option>0–1 years</option>
                    <option>1–3 years</option>
                    <option>3–5 years</option>
                    <option>5–10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Skills / Expertise</label>
                <input style={inputStyle} placeholder="e.g. soil science, community engagement, forestry…" value={form.skills} onChange={set("skills")} />
              </div>
              <div>
                <label style={labelStyle}>Why do you want to join EcoTrace?</label>
                <textarea
                  required rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }}
                  placeholder="Share your motivation and passion for environmental work…"
                  value={form.motivation} onChange={set("motivation")}
                />
              </div>
              <button
                type="submit" disabled={loading}
                style={{
                  background: loading ? "linear-gradient(135deg,#0f7a44,#15b05e)" : "linear-gradient(135deg,#0a4d2e,#0f7a44)",
                  color: "#fff", border: "none", borderRadius: 100,
                  padding: "13px", fontSize: 14, fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Poppins', sans-serif", transition: "all 0.2s",
                  letterSpacing: "0.01em", marginTop: "0.25rem",
                  boxShadow: "0 4px 16px rgba(10,77,46,0.28)",
                }}
              >
                {loading ? "Submitting…" : "Submit Application →"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg,#0a4d2e,#15b05e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.25rem", fontSize: 30,
            }}>🌿</div>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 24,
              fontWeight: 800, color: "#0a1a0a", margin: "0 0 10px",
              letterSpacing: "-0.3px",
            }}>Application Received</h2>
            <p style={{
              fontFamily: "'Poppins', sans-serif", fontSize: 13.5,
              color: "#5a7a65", lineHeight: 1.70,
              maxWidth: 340, margin: "0 auto 1.5rem", fontWeight: 400,
            }}>
              Thank you for applying. Our team will review your application and reach out if there's a match.
            </p>
            <button onClick={onClose} style={{
              background: "linear-gradient(135deg,#f0fbf4,#e2f5eb)",
              color: "#0a4d2e", border: "1.5px solid rgba(15,122,68,0.22)",
              borderRadius: 100, padding: "10px 28px",
              fontSize: 13.5, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Poppins', sans-serif",
            }}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Inner Content ──────────────────────────────────────────────────────────

function CareersContent() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [filter, setFilter] = useState("All")

  const types = ["All", "Full-time", "Field", "Hybrid"]
  const filtered = filter === "All" ? ROLES : ROLES.filter((r) => r.type === filter)

  return (
    <>
      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .careers-hero {
          background: linear-gradient(145deg, #052a18 0%, #0a4d2e 30%, #0f7a44 60%, #15b05e 85%, #1ecc6e 100%);
          padding: 140px 2rem 90px;
          text-align: center; position: relative; overflow: hidden;
        }
        .careers-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px);
          background-size: 36px 36px; pointer-events: none;
        }
        .careers-hero-orb1 {
          position: absolute; top: 8%; right: 5%;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(30,204,110,0.18) 0%, transparent 68%);
          pointer-events: none;
        }
        .careers-hero-orb2 {
          position: absolute; bottom: 5%; left: -3%;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(30,204,110,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .careers-hero-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; }

        .careers-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(30,204,110,0.12); backdrop-filter: blur(12px);
          border: 1px solid rgba(30,204,110,0.25); border-radius: 100px;
          padding: 7px 20px; font-family: 'Poppins', sans-serif;
          font-size: 11.5px; color: #a7f3d0; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 30px;
        }
        .careers-hero h1 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(48px, 7vw, 82px); font-weight: 800; color: #fff;
          line-height: 1.07; letter-spacing: -2px; margin-bottom: 8px;
        }
        .careers-hero h1 span {
          background: linear-gradient(92deg, #a7f3d0 0%, #4ade80 50%, #bbf7d0 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .careers-hero-sub {
          font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 400;
          color: rgba(255,255,255,0.65); line-height: 1.80;
          max-width: 520px; margin: 20px auto 44px;
        }
        .careers-hero-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #0a4d2e; border: none; border-radius: 100px;
          padding: 14px 36px; font-size: 14px; font-weight: 700;
          cursor: pointer; text-decoration: none; letter-spacing: 0.01em;
          font-family: 'Poppins', sans-serif; transition: all 0.22s ease;
          box-shadow: 0 4px 20px rgba(255,255,255,0.15);
        }
        .careers-hero-cta:hover {
          background: #f0fbf4; transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(255,255,255,0.22);
        }
        .careers-hero-stats {
          display: flex; justify-content: center; gap: 48px;
          margin-top: 64px; padding-top: 40px;
          border-top: 1px solid rgba(30,204,110,0.20); flex-wrap: wrap;
        }
        .hero-stat-num {
          font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 800;
          color: #a7f3d0; display: block; line-height: 1; letter-spacing: -1px;
        }
        .hero-stat-label {
          font-family: 'Poppins', sans-serif; font-size: 11px;
          color: rgba(167,243,208,0.55); letter-spacing: 0.08em;
          text-transform: uppercase; margin-top: 5px; display: block; font-weight: 500;
        }

        .careers-marquee { background: linear-gradient(90deg,#0a4d2e,#0f7a44); padding: 13px 0; overflow: hidden; }
        .careers-marquee-track { display: flex; animation: marquee 28s linear infinite; width: max-content; }
        .careers-marquee-track span {
          font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 600;
          color: rgba(255,255,255,0.80); white-space: nowrap; padding: 0 44px; letter-spacing: 0.03em;
        }

        .positions-section { background: #f4f8f4; padding: 90px 32px; }
        .positions-inner { max-width: 1200px; margin: 0 auto; }

        .c-eyebrow {
          display: inline-block;
          background: linear-gradient(135deg,#0a4d2e,#0f7a44);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          font-size: 12px; font-weight: 700; letter-spacing: 0.11em;
          text-transform: uppercase; margin-bottom: 14px; font-family: 'Poppins', sans-serif;
        }
        .c-title {
          font-family: 'Poppins', sans-serif; font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 800; color: #0a1a0a; letter-spacing: -1px; line-height: 1.10; margin-bottom: 14px;
        }
        .c-desc {
          font-family: 'Poppins', sans-serif; font-size: 15px; color: #5a7a65;
          max-width: 500px; line-height: 1.80; font-weight: 400;
        }

        .filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin: 36px 0 28px; }
        .filter-btn {
          padding: 8px 20px; border-radius: 100px; font-size: 13px; font-weight: 600;
          cursor: pointer; border: 1.5px solid rgba(15,122,68,0.22);
          background: #fff; color: #0a4d2e; font-family: 'Poppins', sans-serif;
          transition: all 0.18s; letter-spacing: 0.01em;
        }
        .filter-btn:hover { border-color: #0f7a44; background: #f0fbf4; }
        .filter-btn.active {
          background: linear-gradient(135deg,#0a4d2e,#0f7a44);
          color: #fff; border-color: transparent;
          box-shadow: 0 4px 14px rgba(10,77,46,0.25);
        }

        .role-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 22px; }

        .perks-section {
          background: linear-gradient(145deg, #052a18 0%, #0a4d2e 30%, #0f7a44 65%, #15b05e 90%, #1ecc6e 100%);
          padding: 90px 32px; position: relative; overflow: hidden;
        }
        .perks-section::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px);
          background-size: 36px 36px; pointer-events: none;
        }
        .perks-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .perks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; margin-top: 48px; }

        .perk-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(30,204,110,0.18);
          border-radius: 18px; padding: 26px; transition: all 0.22s;
        }
        .perk-card:hover {
          background: rgba(30,204,110,0.10); border-color: rgba(30,204,110,0.35);
          transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }
        .perk-emoji {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(30,204,110,0.12); border: 1px solid rgba(30,204,110,0.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 16px;
        }
        .perk-card h3 { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700; color: #e8f5e9; margin-bottom: 8px; }
        .perk-card p { font-family: 'Poppins', sans-serif; font-size: 13px; color: rgba(167,243,208,0.70); line-height: 1.70; font-weight: 400; }

        .careers-footer { background: #052a18; padding: 22px 32px; text-align: center; border-top: 1px solid rgba(15,122,68,0.15); }
        .careers-footer p { font-family: 'Poppins', sans-serif; font-size: 12.5px; color: rgba(167,243,208,0.45); font-weight: 400; }

        @media (max-width: 600px) {
          .careers-hero { padding: 110px 1.25rem 60px; }
          .careers-hero-stats { gap: 24px; }
          .positions-section, .perks-section { padding: 60px 1.25rem; }
          .role-grid, .perks-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section className="careers-hero">
        <div className="careers-hero-orb1" />
        <div className="careers-hero-orb2" />
        <div className="careers-hero-inner">
          <div className="careers-badge">
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", animation: "dot-pulse 2.2s infinite", display: "inline-block" }} />
            We're Hiring · Join the Mission
          </div>
          <h1>Careers at<br /><span>EcoTrace</span></h1>
          <p className="careers-hero-sub">
            Help us restore ecosystems, plant millions of trees, and build a greener India — one tree at a time.
          </p>
          <a href="#open-positions" className="careers-hero-cta">View Open Positions →</a>
          <div className="careers-hero-stats">
            {[["1,284+", "Trees Planted"], ["4", "Open Roles"], ["18", "States Active"], ["40K+", "Families Served"]].map(([num, label]) => (
              <div key={label}>
                <span className="hero-stat-num">{num}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="careers-marquee">
        <div className="careers-marquee-track">
          {[...Array(2)].flatMap(() => [
            "🌳 128,540 Trees Planted", "💨 7.7M kg Oxygen Generated",
            "♻️ 2.5M kg CO₂ Reduced", "🌲 342 Forests Created",
            "🇮🇳 Rooted Across 18 Indian States", "🤝 Trusted by 40,000+ Families",
          ]).map((item, i) => (
            <span key={i}>{item}<span style={{ marginLeft: 44, color: "rgba(255,255,255,0.22)" }}>·</span></span>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <section className="positions-section" id="open-positions">
        <div className="positions-inner">
          <span className="c-eyebrow">🌿 Open Positions</span>
          <h2 className="c-title">Join the Mission</h2>
          <p className="c-desc">We're building a team of field experts and community leaders committed to real environmental impact.</p>
          <div className="filter-bar">
            {types.map((t) => (
              <button key={t} className={`filter-btn${filter === t ? " active" : ""}`} onClick={() => setFilter(t)}>{t}</button>
            ))}
          </div>
          <div className="role-grid">
            {filtered.map((role) => <RoleCard key={role.id} role={role} onApply={setSelectedRole} />)}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="perks-section">
        <div className="perks-inner">
          <span className="c-eyebrow" style={{ color: "#a7f3d0", background: "none", WebkitTextFillColor: "#a7f3d0" }}>🌿 Why EcoTrace</span>
          <h2 className="c-title" style={{ color: "#fff" }}>Build Real Climate Impact</h2>
          <p className="c-desc" style={{ color: "rgba(167,243,208,0.65)" }}>
            At EcoTrace, your work directly contributes to measurable environmental restoration — not just a number on a dashboard.
          </p>
          <div className="perks-grid">
            {PERKS.map((p) => (
              <div className="perk-card" key={p.title}>
                <div className="perk-emoji">{p.emoji}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="careers-footer">
        <p>© {new Date().getFullYear()} EcoTrace · Restoring Ecosystems, One Tree at a Time</p>
      </div>

      {/* Modal */}
      {selectedRole && <ApplicationModal role={selectedRole} onClose={() => setSelectedRole(null)} />}
    </>
  )
}

// ─── Page Export ────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <Layout>
      {() => <CareersContent />}
    </Layout>
  )
}