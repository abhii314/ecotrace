"use client";

import Layout from "@/components/Layout";

/* ─────────────────────────────────────────────
   PAGE-SCOPED STYLES
───────────────────────────────────────────── */
const PAGE_CSS = `
  @keyframes fadeUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes floatA  { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-10px) rotate(4deg); } }
  @keyframes floatB  { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-14px) rotate(-4deg); } }
  @keyframes pulse   { 0%,100% { box-shadow:0 0 0 0 rgba(15,157,88,0.45); } 50% { box-shadow:0 0 0 10px rgba(15,157,88,0); } }

  .fu  { animation: fadeUp 0.65s ease both; }
  .fu1 { animation: fadeUp 0.65s 0.10s ease both; }
  .fu2 { animation: fadeUp 0.65s 0.20s ease both; }
  .fu3 { animation: fadeUp 0.65s 0.30s ease both; }
  .fla { animation: floatA 7s ease-in-out infinite; }
  .flb { animation: floatB 9s ease-in-out infinite 1.5s; }

  .vmp-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 20px;
    padding: 36px 30px;
    transition: transform 0.28s ease, background 0.28s ease, box-shadow 0.28s ease;
  }
  .vmp-card:hover {
    transform: translateY(-6px);
    background: rgba(255,255,255,0.09);
    box-shadow: 0 24px 52px rgba(0,0,0,0.28);
  }

  .check-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 11px; }

  .hdots {
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0);
    background-size: 28px 28px;
  }

  .section-pill {
    display: inline-block;
    background: rgba(15,157,88,0.22);
    border: 1px solid rgba(15,157,88,0.40);
    color: #6ee7b7;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    padding: 6px 18px;
    border-radius: 9999px;
    margin-bottom: 22px;
    backdrop-filter: blur(8px);
  }

  @media (max-width: 900px) {
    .vmp-grid { grid-template-columns: 1fr !important; }
    .founder-inner { flex-direction: column !important; align-items: flex-start !important; }
  }
`;

/* ─────────────────────────────────────────────
   SHARED BG — all 3 sections share the same
   deep-forest dark-green gradient so it
   looks like one continuous page canvas.
───────────────────────────────────────────── */
const BG = "linear-gradient(170deg,#052a18 0%,#083d22 35%,#0a4d2e 65%,#0c5c34 100%)";

/* ─────────────────────────────────────────────
   SECTION 1 — HERO + OUR STORY
───────────────────────────────────────────── */
function OurStory() {
  return (
    <section className="hdots" style={{
      background: BG,
      padding: "100px 24px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Orbs */}
      <div style={{ position:"absolute", top:"-12%", left:"-5%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(15,157,88,0.14) 0%,transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-10%", right:"-3%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(8,145,178,0.10) 0%,transparent 65%)", pointerEvents:"none" }} />

      {/* Floating emojis */}
      <span className="fla" style={{ position:"absolute", top:"18%", left:"6%", fontSize:52, opacity:0.08, pointerEvents:"none", userSelect:"none" }}>🌿</span>
      <span className="flb" style={{ position:"absolute", top:"14%", right:"7%", fontSize:44, opacity:0.07, pointerEvents:"none", userSelect:"none" }}>🌳</span>

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Hero headline */}
        <div className="fu" style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-pill">Our Story</span>
          <h1 style={{
            fontSize: "clamp(2.6rem,5.5vw,4rem)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-1.8px",
            lineHeight: 1.10,
            margin: "0 0 18px",
          }}>
            Rooted in Purpose,<br />
            <span style={{
              background: "linear-gradient(92deg,#6ee7b7 0%,#34d399 50%,#a7f3d0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Growing for Generations
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.60)", lineHeight: 1.80, maxWidth: 520, margin: "0 auto" }}>
            A movement born from compassion — nurturing the planet the same way we nurture people.
          </p>
        </div>

        {/* Story card */}
        <div className="fu1" style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 22,
          padding: "36px 38px",
          backdropFilter: "blur(12px)",
        }}>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.85, margin: "0 0 28px" }}>
            Our founder, a humanitarian known for reaching young people in their darkest moments,
            built this platform as a continuation of that same compassion. Where once he saved lives
            through guidance and presence, he now channels that same care into nurturing life itself —
            the life of the planet.
          </p>

          {/* Quote block */}
          <div style={{
            background: "linear-gradient(135deg,rgba(15,157,88,0.22),rgba(13,157,110,0.18))",
            border: "1px solid rgba(15,157,88,0.30)",
            borderLeft: "4px solid #0f9d58",
            borderRadius: 14,
            padding: "20px 24px",
            marginBottom: 28,
          }}>
            <p style={{
              fontSize: 17,
              fontStyle: "italic",
              fontWeight: 700,
              color: "#a7f3d0",
              margin: 0,
              letterSpacing: "-0.2px",
              lineHeight: 1.55,
            }}>
              "Green is the Colour of Safety."
            </p>
          </div>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.85, margin: 0 }}>
            Today, this mission unites people across generations — from young dreamers who wish to heal
            the world, to wise elders who wish to give back. Together, we are building a living legacy
            that stands tall, gives shade, and sustains hope for centuries.
          </p>
        </div>

        {/* Stats row */}
        <div className="fu2" style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          marginTop: 40,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 18,
          overflow: "hidden",
        }}>
          {[
            ["2019", "Founded"],
            ["128k+", "Trees Planted"],
            ["18", "States"],
            ["40k+", "Families"],
          ].map(([val, label], i, arr) => (
            <div key={label} style={{
              flex: 1,
              padding: "22px 16px",
              textAlign: "center",
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80", letterSpacing: "-0.5px", lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", fontWeight: 600, marginTop: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 2 — FOUNDER'S MESSAGE
───────────────────────────────────────────── */
function FounderMessage() {
  return (
    <section style={{
      background: BG,
      padding: "20px 24px 88px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Faint divider line */}
      <div style={{ maxWidth: 760, margin: "0 auto 60px", height: 1, background: "rgba(255,255,255,0.07)" }} />

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Section label */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="section-pill">Founder's Message</span>
          <h2 style={{
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-1px",
            lineHeight: 1.12,
            margin: 0,
          }}>
            A Message from Our Founder
          </h2>
        </div>

        {/* Message card */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 22,
          padding: "40px 40px 36px",
          backdropFilter: "blur(12px)",
          position: "relative",
        }}>
          {/* Big quote mark */}
          <div style={{
            position: "absolute",
            top: 24, left: 32,
            fontSize: 80,
            lineHeight: 1,
            color: "rgba(15,157,88,0.25)",
            fontFamily: "Georgia, serif",
            fontWeight: 900,
            userSelect: "none",
          }}>
            "
          </div>

          {/* Founder avatar + name */}
          <div className="founder-inner" style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 32,
            paddingTop: 16,
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg,#0f9d58,#0a7d44)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, flexShrink: 0,
              border: "2.5px solid rgba(15,157,88,0.50)",
              boxShadow: "0 0 0 0 rgba(15,157,88,0.45)",
              animation: "pulse 2.8s infinite",
            }}>
              🌱
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.2px" }}>Our Founder</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>Visionary · Humanitarian · Environmentalist</div>
            </div>
          </div>

          {/* Message paragraphs */}
          {[
            "I have spent my life reaching young people before they gave up on their own stories. In those quiet moments of healing, I learned something profound — every life needs meaning, and every act needs memory.",
            "Trees give us both. They grow without asking, they give without taking, and they forgive without limit.",
            "This platform is my way of teaching the world to give back — not through words, but through roots. When you plant a tree, you don't just grow wood and leaves — you grow faith. And when we have faith in the Earth, the Earth heals us back.",
          ].map((para, i) => (
            <p key={i} style={{
              fontSize: 15.5,
              color: i === 1 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.68)",
              lineHeight: 1.85,
              margin: "0 0 20px",
              fontStyle: i === 1 ? "italic" : "normal",
              fontWeight: i === 1 ? 600 : 400,
            }}>
              {para}
            </p>
          ))}

          {/* Signature */}
          <div style={{
            marginTop: 8,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              padding: "8px 20px",
              background: "rgba(15,157,88,0.15)",
              border: "1px solid rgba(15,157,88,0.25)",
              borderRadius: 9999,
              fontSize: 12.5,
              color: "#6ee7b7",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}>
              🌿 With roots and love
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 3 — VISION, MISSION & PHILOSOPHY
───────────────────────────────────────────── */
function VisionMissionPhilosophy() {
  const CARDS = [
    {
      icon: "👁️",
      iconBg: "linear-gradient(135deg,#0f9d58,#0a7d44)",
      title: "Our Vision",
      body: "To create a world where planting trees becomes as natural as breathing — where every individual and organization has a piece of land, a piece of green, and a piece of responsibility that belongs to them.",
      type: "text",
    },
    {
      icon: "🎯",
      iconBg: "linear-gradient(135deg,#0891b2,#0d9488)",
      title: "Our Mission",
      body: "We exist to create structured, accountable, and soulful reforestation at scale.",
      type: "checklist",
      items: [
        "Bounded ecosystem with traceable tree sections",
        "Personalised gifting & carbon offsetting",
        "Lifetime caretakers assigned to each tree",
        "Digital transparency & real-time growth tracking",
      ],
    },
    {
      icon: "💚",
      iconBg: "linear-gradient(135deg,#15b05e,#0f9d58)",
      title: "Our Philosophy",
      body: "We believe that planting trees is not an event — it's a relationship.",
      type: "quote",
      quote: "What we plant, we become. What we nurture, nurtures us. What we leave behind, defines who we were.",
    },
  ];

  return (
    <section style={{
      background: BG,
      padding: "0 24px 100px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Orb bottom */}
      <div style={{ position:"absolute", bottom:"-8%", left:"20%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(15,157,88,0.10) 0%,transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Faint divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 64 }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-pill">Our Core Values</span>
          <h2 style={{
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-1px",
            lineHeight: 1.12,
            margin: 0,
          }}>
            Vision, Mission &amp; Philosophy
          </h2>
        </div>

        {/* Cards */}
        <div className="vmp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {CARDS.map(card => (
            <div key={card.title} className="vmp-card">

              {/* Icon */}
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: card.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, marginBottom: 20,
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}>
                {card.icon}
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.3px" }}>
                {card.title}
              </h3>

              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.78, margin: "0 0 16px" }}>
                {card.body}
              </p>

              {/* Checklist */}
              {card.type === "checklist" && (
                <div>
                  {card.items.map(item => (
                    <div key={item} className="check-item">
                      <span style={{ color: "#4ade80", fontSize: 13, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.60)", lineHeight: 1.60 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Philosophy quote */}
              {card.type === "quote" && (
                <div style={{
                  background: "rgba(15,157,88,0.15)",
                  border: "1px solid rgba(15,157,88,0.25)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}>
                  <p style={{ fontSize: 13, color: "#a7f3d0", fontStyle: "italic", fontWeight: 600, margin: 0, lineHeight: 1.65 }}>
                    "{card.quote}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <Layout>
      {() => (
        <>
          <style>{PAGE_CSS}</style>
          <OurStory />
          <FounderMessage />
          <VisionMissionPhilosophy />
        </>
      )}
    </Layout>
  );
}