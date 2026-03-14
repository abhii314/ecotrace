"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar({ cart }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [username,  setUsername]  = useState("");
  const router   = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  /* ── Check token on every route change ── */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      const uname = localStorage.getItem("username") || "My Account";
      setUsername(uname);
    } else {
      setLoggedIn(false);
      setUsername("");
    }
  }, [pathname]);

  /* ── Scroll listener ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuOpen]);

  if (isAuthPage) return null;

  const sc = scrolled;

  const handleAuthClick = (e) => {
    e.stopPropagation();
    if (loggedIn) setMenuOpen(o => !o);
    else router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
      height: 66,
      background: sc ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: sc ? "blur(22px) saturate(2)" : "none",
      borderBottom: sc ? "1px solid rgba(10,77,46,0.10)" : "none",
      transition: "all 0.38s cubic-bezier(.4,0,.2,1)",
      boxShadow: sc ? "0 2px 24px rgba(10,77,46,0.08)" : "none",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 32px",
        height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* ── Logo ── */}
        <div onClick={() => router.push("/")} style={{
          display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg,#0a4d2e,#15b05e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 14px rgba(10,77,46,0.35)", fontSize: 17,
          }}>🌱</div>
          <span style={{
            fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 20,
            color: sc ? "#0a4d2e" : "#fff", letterSpacing: "-0.3px", transition: "color 0.3s",
          }}>EcoTrace</span>
        </div>

        {/* ── Nav Links ── */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[
            { name: "Home",              path: "/" },
            { name: "For Organizations", path: "/organization" },
            { name: "Create Forest",     path: "/create-forest" },
            { name: "Impact Center",     path: "/impact-center" },
            { name: "Careers",           path: "/career" },
            { name: "About Us",          path: "/about-us" },
          ].map(link => (
            <a key={link.name} href={link.path}
              className={"nlink" + (sc ? " dark" : "")}
              style={{
                fontFamily: "'Poppins',sans-serif", fontSize: 13.5, fontWeight: 500,
                color: sc ? "#1a2e1a" : "rgba(255,255,255,0.90)",
                transition: "color 0.25s", textDecoration: "none",
                textShadow: sc ? "none" : "0 1px 6px rgba(0,0,0,0.22)",
              }}
            >{link.name}</a>
          ))}
        </div>

        {/* ── Right CTA ── */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0, position: "relative" }}>

          {/* Login / Profile button */}
          <button onClick={handleAuthClick} style={{
            display: "flex", alignItems: "center", gap: 7,
            background: sc ? "linear-gradient(135deg,#0a4d2e,#0f7a44)" : "rgba(255,255,255,0.14)",
            backdropFilter: sc ? "none" : "blur(10px)",
            color: "#fff",
            border: sc ? "none" : "1.5px solid rgba(255,255,255,0.30)",
            borderRadius: 100, padding: "9px 20px", cursor: "pointer",
            fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13.5,
            transition: "all 0.25s",
            boxShadow: sc ? "0 4px 16px rgba(10,77,46,0.28)" : "none",
          }}>
            {loggedIn ? (
              <>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "rgba(255,255,255,0.22)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                }}>👤</span>
                Profile
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transition: "transform 0.22s", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Login
              </>
            )}
          </button>

          {/* ── Profile dropdown ── */}
          {loggedIn && menuOpen && (
            <div onClick={e => e.stopPropagation()} style={{
              position: "absolute", top: "calc(100% + 12px)", right: 0,
              width: 224,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(10,77,46,0.18), 0 0 0 1px rgba(10,77,46,0.08)",
              overflow: "hidden",
              zIndex: 500,
              animation: "fadeUp 0.22s ease both",
            }}>
              {/* Header */}
              <div style={{
                padding: "18px 18px 14px",
                background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
                borderBottom: "1px solid #e6f4ec",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg,#0a4d2e,#15b05e)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 19, marginBottom: 10,
                }}>👤</div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 700, color: "#0a1a0a" }}>
                  {username}
                </div>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: "#5a7a65", marginTop: 2 }}>
                  Logged in
                </div>
              </div>

              {/* Links */}
              {[
                { icon: "🌿", label: "Dashboard",  path: "/dashboard" },
                { icon: "🌳", label: "My Trees",   path: "/dashboard" },
                { icon: "🏆", label: "My Impact",  path: "/dashboard" },
                { icon: "📦", label: "My Orders",  path: "/dashboard" },
                { icon: "⚙️", label: "Settings",   path: "/dashboard" },
              ].map(item => (
                <div key={item.label}
                  onClick={() => { router.push(item.path); setMenuOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "11px 18px",
                    fontFamily: "'Poppins',sans-serif", fontSize: 13.5, fontWeight: 500,
                    color: "#374151", cursor: "pointer",
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#0a4d2e"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}

              {/* Logout */}
              <div onClick={handleLogout} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 18px",
                fontFamily: "'Poppins',sans-serif", fontSize: 13.5, fontWeight: 600,
                color: "#dc2626", cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign out
              </div>
            </div>
          )}

          {/* ── Cart ── */}
          <Link href="/cart">
            <button style={{
              position: "relative", display: "flex", alignItems: "center", gap: 7,
              background: sc ? "#f0f7f2" : "rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
              color: sc ? "#0a4d2e" : "#fff",
              border: sc ? "1.5px solid rgba(10,77,46,0.15)" : "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 100, padding: "9px 20px", cursor: "pointer",
              fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 13.5,
              transition: "all 0.25s",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Cart
              {cart > 0 && (
                <span style={{
                  position: "absolute", top: -5, right: -5,
                  width: 19, height: 19, borderRadius: "50%",
                  background: "linear-gradient(135deg,#0f7a44,#1ecc6e)",
                  color: "#fff", fontSize: 10, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(10,77,46,0.40)",
                }}>
                  {cart}
                </span>
              )}
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
}