"use client";

import Layout from "@/components/Layout";

/* ─────────────────────────────────────────────
   PAGE-SCOPED STYLES
───────────────────────────────────────────── */
const PAGE_CSS = `
  @keyframes floatA { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(4deg); } }
  @keyframes floatB { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-4deg); } }
  .fla { animation: floatA 7s ease-in-out infinite; }
  .flb { animation: floatB 9s ease-in-out infinite 1.5s; }

  .hbtns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  .occ-card { transition: transform 0.25s ease, box-shadow 0.25s ease; cursor: pointer; }
  .occ-card:hover { transform: translateY(-7px); box-shadow: 0 22px 48px rgba(0,0,0,0.13) !important; }

  .step-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .step-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(0,0,0,0.09) !important; }

  .test-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .test-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,0.10) !important; }

  .btn-primary { transition: transform 0.2s, box-shadow 0.2s; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255,255,255,0.25) !important; }
  .btn-outline { transition: transform 0.2s, background 0.2s; }
  .btn-outline:hover { transform: translateY(-2px); background: rgba(255,255,255,0.14) !important; }
  .btn-green { transition: background 0.18s, transform 0.18s; }
  .btn-green:hover { background: #0a8c4a !important; transform: translateY(-1px); }

  .hdots { background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size: 30px 30px; }

  @media (max-width: 1024px) {
    .occ-grid { grid-template-columns: repeat(3, 1fr) !important; }
    .step-grid { grid-template-columns: repeat(1, 1fr) !important; }
    .test-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 640px) {
    .occ-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .hbtns { flex-direction: column; align-items: center; }
  }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const OCCASIONS = [
  { emoji: "🎂", title: "Birthday",              color: "#f59e0b", desc: "A thoughtful, sustainable gift that grows with time. Make someone's birthday unforgettable with a gesture that brings life to the planet." },
  { emoji: "💍", title: "Wedding",               color: "#8b5cf6", desc: 'Transform your celebration into something beautiful for the Earth. Plant trees as wedding favors and let your "yes" bloom into a greener future.' },
  { emoji: "👶", title: "Birth",                 color: "#f97316", desc: "Welcome new life with a forest of hope. Celebrate this precious beginning by planting trees that nurture a fairer, greener tomorrow." },
  { emoji: "🌹", title: "In Memory",             color: "#ef4444", desc: "Honor a loved one with a tribute that lives on. Planting a forest in their memory lets their story, love, and legacy continue to grow." },
  { emoji: "🌱", title: "Create Your Occasion",  color: "#10b981", desc: "Start a collective green gesture. Bring your group, family, or community together to create a forest and make a meaningful impact—together." },
];

const STEPS = [
  {
    step: "01",
    title: "Plant Trees",
    desc: "Every forest begins with a single act of care. Choose from our thoughtfully curated mixes with the perfect blend of forest and fruit species — and start growing your forest, tree by tree.",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
    icon: "🌳",
  },
  {
    step: "02",
    title: "Customize",
    desc: "Give your forest a personal touch. Name it, choose a cover image, and share why you created it — turning your forest into a meaningful story others can connect with.",
    img: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=400&q=80",
    icon: "✏️",
  },
  {
    step: "03",
    title: "Share Your Impact",
    desc: "A beautiful story deserves to be shared. Download your certificate and share your forest on social media — show the world the meaningful impact your memory is creating.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
    icon: "🌍",
  },
];

const TESTIMONIALS = [
  {
    occasion: "Wedding",
    occasionColor: "#8b5cf6",
    name: "Prahassan Reddy & Soumya",
    location: "Hyderabad, Telangana",
    avatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=80&q=80",
    text: "No party favors this time — instead, we planted 50 trees! They'll grow over time, just like our love. If you'd like to give us a gift, plant a few trees yourself and help our forest keep growing!",
    trees: "50 trees planted",
  },
  {
    occasion: "Wedding",
    occasionColor: "#8b5cf6",
    name: "Deshik & Samardita",
    location: "Bengaluru, Karnataka",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    text: "We wanted our 'forever' to begin with something meaningful. Planting trees for our wedding felt like the perfect symbol — roots, growth, and a future we build together.",
    trees: "40 trees planted",
  },
  {
    occasion: "Graduation",
    occasionColor: "#0f9d58",
    name: "Kaushal Saha",
    location: "Bhopal, Madhya Pradesh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    text: "We did it! To mark this milestone, I've decided to plant trees.",
    trees: "30 trees planted",
  },
  {
    occasion: "Birthday",
    occasionColor: "#f59e0b",
    name: "Arjun",
    location: "Indore, Madhya Pradesh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    text: "Another year older — and hopefully wiser! This year, I wanted to begin by doing something good for the planet. I've planted 37 trees, one for each candle.",
    trees: "37 trees planted",
  },
];

/* ─────────────────────────────────────────────
   SECTION 1 — HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hdots" style={{
      background: "linear-gradient(160deg, #0a5c38 0%, #0f9d58 45%, #0d9d6e 100%)",
      minHeight: "56vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "110px 24px 120px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Orbs */}
      <div style={{ position: "absolute", top: "-15%", left: "-6%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", right: "-4%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Floating emojis */}
      <span className="fla" style={{ position: "absolute", top: "22%", left: "8%",  fontSize: 52, opacity: 0.10, pointerEvents: "none", userSelect: "none" }}>🌿</span>
      <span className="flb" style={{ position: "absolute", top: "18%", right: "9%", fontSize: 44, opacity: 0.09, pointerEvents: "none", userSelect: "none" }}>🌳</span>
      <span className="fla" style={{ position: "absolute", bottom: "20%", left: "14%", fontSize: 32, opacity: 0.08, pointerEvents: "none", userSelect: "none", animationDelay: "2s" }}>🌱</span>

      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <h1 style={{
          fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
          fontWeight: 900,
          color: "#fff",
          lineHeight: 1.10,
          letterSpacing: "-1.8px",
          margin: "0 0 22px",
        }}>
          Create Your Forest
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 1.8vw, 1.12rem)",
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.80,
          maxWidth: 480,
          margin: "0 auto 44px",
          fontWeight: 400,
        }}>
          Turn special moments into living memories. Celebrate life's milestones by planting trees that continue to grow, protect, and heal our planet for years to come.
        </p>

        <div className="hbtns">
          <button className="btn-primary" style={{
            background: "#fff",
            color: "#0a5c38",
            border: "none", borderRadius: 9999,
            padding: "14px 40px", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 6px 22px rgba(0,0,0,0.16)",
          }}>
            Create Your Forest
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 2 — OCCASIONS
───────────────────────────────────────────── */
function Occasions() {
  return (
    <section className="hdots" style={{
      background: "linear-gradient(180deg, #0c8c4e 0%, #0a7d44 100%)",
      padding: "92px 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 58 }}>
          <h2 style={{
            fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
            fontWeight: 800, color: "#fff",
            letterSpacing: "-0.8px", margin: "0 0 14px",
          }}>
            Moments That Deserve to Take Root
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", maxWidth: 460, margin: "0 auto", lineHeight: 1.72 }}>
            Some memories deserve more than a celebration — they deserve to grow.
          </p>
        </div>

        <div className="occ-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {OCCASIONS.map(occ => (
            <div key={occ.title} className="occ-card" style={{
              background: "#fff",
              borderRadius: 18,
              padding: "28px 18px 24px",
              display: "flex", flexDirection: "column", gap: 10,
              boxShadow: "0 4px 18px rgba(0,0,0,0.09)",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${occ.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, marginBottom: 4,
              }}>
                {occ.emoji}
              </div>
              <h3 style={{ fontSize: 15.5, fontWeight: 700, color: occ.color, margin: 0, letterSpacing: "-0.2px" }}>{occ.title}</h3>
              <p style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.68, margin: 0, flex: 1 }}>{occ.desc}</p>
              <button className="btn-green" style={{
                background: "#0f9d58", color: "#fff",
                border: "none", borderRadius: 10,
                padding: "10px 14px", fontSize: 12.5, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit", marginTop: 6,
              }}>
                Create your Forest
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 3 — HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section style={{ background: "#f5f5f0", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{
            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
            fontWeight: 800, color: "#111827",
            letterSpacing: "-0.8px", margin: "0 0 18px",
          }}>
            How It Works
          </h2>
          <p style={{ fontSize: 15.5, color: "#6b7280", maxWidth: 480, margin: "0 auto", lineHeight: 1.78 }}>
            Creating a Forest is a simple, beautiful gesture.<br />
            It takes only a moment — but the memory lasts forever.<br />
            For you, and for everyone who joins you in planting a tree.
          </p>
        </div>

        {/* Steps */}
        <div className="step-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginBottom: 52 }}>
          {STEPS.map((s, i) => (
            <div key={s.step} className="step-card" style={{
              background: "#fff",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
            }}>
              {/* Image */}
              <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                <img src={s.img} alt={s.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.target.style.display = "none"; }}
                />
                {/* Step number overlay */}
                <div style={{
                  position: "absolute", top: 14, left: 14,
                  background: "#0f9d58", color: "#fff",
                  width: 36, height: 36, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800,
                  boxShadow: "0 4px 12px rgba(15,157,88,0.40)",
                }}>
                  {s.step}
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: "22px 22px 24px" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 10px", letterSpacing: "-0.3px" }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.72, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button className="btn-green" style={{
            background: "#0f9d58", color: "#fff",
            border: "none", borderRadius: 9999,
            padding: "14px 44px", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 6px 22px rgba(15,157,88,0.32)",
          }}>
            Start now →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 4 — COMMUNITY TESTIMONIALS
───────────────────────────────────────────── */
function Community() {
  return (
    <section style={{ background: "#fafaf8", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{
            display: "inline-block",
            color: "#0f9d58", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 14,
            border: "1px solid #bbf7d0", background: "#dcfce7",
            padding: "5px 16px", borderRadius: 9999,
          }}>
            From Our Community
          </span>
          <h2 style={{
            fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
            fontWeight: 800, color: "#111827",
            letterSpacing: "-0.7px", margin: "0 0 16px",
          }}>
            Here's who chose to celebrate<br />by planting trees
          </h2>
          <p style={{ fontSize: 15.5, color: "#6b7280", maxWidth: 560, margin: "0 auto", lineHeight: 1.72 }}>
            To celebrate a graduation, commemorate a birth, or share the joy of a wedding: there are many occasions for creating your own Forest. Involve your loved ones and make a tangible gesture for the planet.
          </p>
        </div>

        {/* Cards grid */}
        <div className="test-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="test-card" style={{
              background: "#fff",
              borderRadius: 18,
              padding: "26px 26px 22px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid #e5e7eb",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {/* Occasion tag */}
              <span style={{
                display: "inline-block",
                background: `${t.occasionColor}18`,
                color: t.occasionColor,
                fontSize: 10.5, fontWeight: 700,
                letterSpacing: "0.09em", textTransform: "uppercase",
                padding: "4px 12px", borderRadius: 9999,
                alignSelf: "flex-start",
              }}>
                {t.occasion}
              </span>

              {/* User row */}
              <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <img src={t.avatar} alt={t.name}
                  style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid #e5e7eb" }}
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80"; }}
                />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", letterSpacing: "-0.2px" }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: "#9ca3af", marginTop: 2 }}>{t.location}</div>
                </div>
              </div>

              {/* Quote */}
              <p style={{ fontSize: 13.5, color: "#4b5563", lineHeight: 1.72, margin: 0, flex: 1 }}>
                {t.text}
              </p>

              {/* Tags row */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${t.occasionColor}15`, color: t.occasionColor, fontSize: 11.5, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
                  🎉 {t.occasion}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#dcfce7", color: "#166534", fontSize: 11.5, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
                  🌳 {t.trees}
                </span>
              </div>
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
export default function CreateForestPage() {
  return (
    <Layout>
      {() => (
        <>
          <style>{PAGE_CSS}</style>
          <Hero />
          <Occasions />
          <HowItWorks />
          <Community />
        </>
      )}
    </Layout>
  );
}