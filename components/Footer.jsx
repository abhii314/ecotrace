"use client";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      style={{
        background:
          "linear-gradient(160deg, #041509 0%, #0a3020 50%, #0d4a28 100%)",
        padding: "80px 32px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
            gap: 56,
            marginBottom: 64,
            alignItems: "start",
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#0a4d2e,#15b05e)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  boxShadow: "0 4px 14px rgba(10,77,46,0.4)",
                }}
              >
                🌱
              </div>
              <span
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#fff",
                }}
              >
                EcoTrace
              </span>
            </div>

            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: 13.5,
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.85,
                maxWidth: 290,
                marginBottom: 28,
              }}
            >
              Together, we're planting hope. One tree today becomes a greener,
              healthier tomorrow. Join our mission to create a future the next
              generation will thank us for.
            </p>

            {/* Newsletter */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 600,
                  marginBottom: 12,
                  letterSpacing: "0.04em",
                }}
              >
                Subscribe for updates
              </div>
              {subscribed ? (
                <div
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: 13,
                    color: "#4ade80",
                    fontWeight: 600,
                  }}
                >
                  ✓ Thanks for subscribing!
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      borderRadius: 100,
                      padding: "10px 18px",
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: 13,
                      color: "#fff",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={() => {
                      if (email) setSubscribed(true);
                    }}
                    style={{
                      background: "linear-gradient(135deg,#0f7a44,#15b05e)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 100,
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontFamily: "'Poppins',sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      boxShadow: "0 4px 16px rgba(15,122,68,0.35)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 9 }}>
              {[
                { label: "𝕏", href: "#" },
                { label: "in", href: "#" },
                { label: "f", href: "#" },
                { label: "▶", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.50)",
                    cursor: "pointer",
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    transition: "all 0.22s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(15,122,68,0.30)";
                    e.currentTarget.style.color = "#4ade80";
                    e.currentTarget.style.borderColor =
                      "rgba(15,122,68,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.50)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.10)";
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: "Company",
              links: ["About Us", "Our Mission", "Blog", "Careers", "Press Kit"],
            },
            {
              title: "Support",
              links: [
                "Help Center",
                "Contact Us",
                "Track My Tree",
                "Planting Guide",
                "FAQs",
              ],
            },
            {
              title: "Legal",
              links: [
                "Privacy Policy",
                "Terms & Conditions",
                "Cookie Policy",
                "Refund Policy",
                "Shipping & Delivery",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  color: "#4ade80",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  marginBottom: 22,
                }}
              >
                {col.title}
              </div>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.40)",
                    textDecoration: "none",
                    marginBottom: 13,
                    fontWeight: 400,
                    transition: "color 0.22s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.85)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.40)")
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider + bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: 12.5,
              color: "rgba(255,255,255,0.24)",
              fontWeight: 400,
            }}
          >
            © 2025 All rights reserved Adoptrees · EcoTrace Technologies Pvt.
            Ltd.
          </p>
          <p
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: 12.5,
              color: "rgba(255,255,255,0.18)",
            }}
          >
            Made with 💚 for a greener India
          </p>
        </div>
      </div>
    </footer>
  );
}