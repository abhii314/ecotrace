"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "../../lib/api";

const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Poppins', sans-serif; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .card-in { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }

  .inp {
    width: 100%; background: #fff;
    border: 1.5px solid #e5e7eb; border-radius: 12px;
    padding: 13px 16px; font-family: 'Poppins', sans-serif;
    font-size: 14px; color: #111827; outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .inp:focus { border-color: #0f9d58; box-shadow: 0 0 0 3px rgba(15,157,88,0.12); }
  .inp::placeholder { color: #9ca3af; }
  .inp.err { border-color: #f87171; box-shadow: 0 0 0 3px rgba(248,113,113,0.10); }

  .inp-wrap { position: relative; }
  .eye-btn {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: #9ca3af;
    display: flex; align-items: center; padding: 0; transition: color 0.15s;
  }
  .eye-btn:hover { color: #0f9d58; }

  .btn-main {
    width: 100%; background: linear-gradient(135deg, #0f9d58, #0a7d44);
    color: #fff; border: none; border-radius: 12px; padding: 15px;
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all 0.22s;
    box-shadow: 0 6px 20px rgba(15,157,88,0.32); letter-spacing: 0.01em;
  }
  .btn-main:hover:not(:disabled) {
    background: linear-gradient(135deg, #0a8c4a, #096b3a);
    box-shadow: 0 10px 28px rgba(15,157,88,0.42); transform: translateY(-1px);
  }
  .btn-main:disabled { opacity: 0.6; cursor: not-allowed; }

  .lbl { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 7px; display: block; }
  .link-green { color: #0f9d58; font-weight: 700; text-decoration: none; cursor: pointer; transition: color 0.15s; }
  .link-green:hover { color: #0a7d44; text-decoration: underline; }
  .err-box {
    display: flex; align-items: center; gap: 10px;
    background: #fef2f2; border: 1px solid #fecaca;
    border-radius: 10px; padding: 11px 14px;
    font-size: 13px; color: #dc2626;
  }
`;

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) { setError("Please enter your username."); return; }
    if (!password)        { setError("Please enter your password."); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      /*
        Backend quirk: returns HTTP 200 even for failed logins,
        but puts { "error": "..." } in the body instead of a token.
        So we check for the error field FIRST, before checking status.
      */
      if (data.error) {
        setError("Invalid username or password. Please try again.");
        return;
      }

      // Also catch proper 4xx responses
      if (!res.ok) {
        const msg =
          data.detail ||
          data.non_field_errors?.[0] ||
          data.message ||
          "Invalid username or password. Please try again.";
        setError(msg);
        return;
      }

      // Extract token — support SimpleJWT, Knox, and custom field names
      const token =
        data.access       ||
        data.token        ||
        data.access_token ||
        data.key;

      if (!token) {
        setError("Login failed. Please try again.");
        return;
      }

      // Store credentials and navigate
      localStorage.setItem("token",    token);
      localStorage.setItem("username", username.trim());
      if (data.refresh) localStorage.setItem("refresh", data.refresh);

      router.push("/dashboard");

    } catch {
      setError("Unable to reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{PAGE_CSS}</style>

      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "24px",
        position: "relative", overflow: "hidden", background: "#1a2e1a",
      }}>
        {/* Forest background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.42) saturate(0.85)", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg,rgba(5,42,24,0.55) 0%,rgba(10,60,30,0.40) 100%)",
          zIndex: 1,
        }} />

        {/* Card */}
        <div className="card-in" style={{
          position: "relative", zIndex: 2,
          width: "100%", maxWidth: 440,
          background: "rgba(240,248,242,0.92)",
          backdropFilter: "blur(24px) saturate(1.8)",
          borderRadius: 24, padding: "44px 40px 36px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.20)",
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#0f9d58,#0a7d44)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 4px 12px rgba(15,157,88,0.35)" }}>🌱</div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#0a4d2e", letterSpacing: "-0.4px", fontFamily: "'Poppins',sans-serif" }}>EcoTrace</span>
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: 6, fontFamily: "'Poppins',sans-serif" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28, lineHeight: 1.6, fontFamily: "'Poppins',sans-serif" }}>
            Sign in to continue your green journey.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Username */}
            <div>
              <label className="lbl">Username</label>
              <input
                className={"inp" + (error ? " err" : "")}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(""); }}
                autoComplete="username"
                autoFocus
              />
            </div>

            {/* Password */}
            <div>
              <label className="lbl">Password</label>
              <div className="inp-wrap">
                <input
                  className={"inp" + (error ? " err" : "")}
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  style={{ paddingRight: 44 }}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPw(p => !p)} tabIndex={-1}>
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginTop: -8 }}>
              <a className="link-green" style={{ fontSize: 13 }}>Forgot password?</a>
            </div>

            {/* Error — clean, no debug info */}
            {error && (
              <div className="err-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button className="btn-main" type="submit" disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Signing in…
                </span>
              ) : "Sign in"}
            </button>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>

          <p style={{ textAlign: "center", fontSize: 13.5, color: "#6b7280", marginTop: 22, fontFamily: "'Poppins',sans-serif" }}>
            New here?{" "}
            <a className="link-green" onClick={() => router.push("/register")}>Create an account</a>
          </p>
        </div>
      </div>
    </>
  );
}