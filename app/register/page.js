"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "../../lib/api";

const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Poppins', sans-serif; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes dropDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
  .card-in { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
  .drop-in { animation: dropDown 0.22s ease both; }

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

  .select-trigger {
    width: 100%; background: #fff;
    border: 1.5px solid #e5e7eb; border-radius: 12px;
    padding: 13px 16px; font-family: 'Poppins', sans-serif;
    font-size: 14px; color: #111827; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    transition: border-color 0.18s, box-shadow 0.18s; user-select: none;
  }
  .select-trigger.open { border-color: #0f9d58; box-shadow: 0 0 0 3px rgba(15,157,88,0.12); border-radius: 12px 12px 0 0; }
  .select-trigger.placeholder { color: #9ca3af; }

  .dropdown-list {
    position: absolute; top: 100%; left: 0; right: 0;
    background: #fff; border: 1.5px solid #0f9d58; border-top: none;
    border-radius: 0 0 12px 12px; overflow: hidden;
    z-index: 50; box-shadow: 0 12px 32px rgba(0,0,0,0.14);
  }
  .drop-opt {
    padding: 12px 16px; font-size: 14px; color: #374151; cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; gap: 10px;
    transition: background 0.14s, color 0.14s;
  }
  .drop-opt:last-child { border-bottom: none; }
  .drop-opt:hover { background: #f0fdf4; color: #0f9d58; }
  .drop-opt.selected { background: #dcfce7; color: #0f9d58; font-weight: 600; }

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
  .err-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #dc2626; }
  .ok-box  { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 10px 14px; font-size: 13px; color: #166534; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 520px) { .two-col { grid-template-columns: 1fr; } }
`;

const ACCOUNT_TYPES = [
  { value: "individual", label: "Individual",  icon: "👤", desc: "Personal tree adoption" },
  { value: "company",    label: "Company",      icon: "🏢", desc: "Corporate CSR programs" },
  { value: "dealer",     label: "Dealer",       icon: "🤝", desc: "Reseller & partner" },
  { value: "worker",     label: "Tree Worker",  icon: "📸", desc: "Upload tree growth photos" },
];

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

const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.22s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

function AccountTypeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = ACCOUNT_TYPES.find(t => t.value === value);

  return (
    <div style={{ position: "relative" }}>
      <div
        className={"select-trigger" + (open ? " open" : "") + (!value ? " placeholder" : "")}
        onClick={() => setOpen(o => !o)}
      >
        {selected ? (
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 17 }}>{selected.icon}</span>
            <span style={{ fontWeight: 600 }}>{selected.label}</span>
            <span style={{ color: "#9ca3af", fontSize: 12 }}>— {selected.desc}</span>
          </span>
        ) : (
          <span>Select account type</span>
        )}
        <ChevronIcon open={open} />
      </div>

      {open && (
        <div className="dropdown-list drop-in">
          {ACCOUNT_TYPES.map(opt => (
            <div key={opt.value}
              className={"drop-opt" + (value === opt.value ? " selected" : "")}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              <span style={{ fontSize: 18 }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{opt.label}</div>
                <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 1 }}>{opt.desc}</div>
              </div>
              {value === opt.value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f9d58" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    accountType: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw]   = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!form.accountType)                      { setError("Please select an account type."); return; }
    if (!form.username.trim())                  { setError("Username is required."); return; }
    if (!form.email.includes("@"))              { setError("Please enter a valid email."); return; }
    if (form.password.length < 8)               { setError("Password must be at least 8 characters."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          // send account type so backend can assign role
          account_type: form.accountType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Surface the first Django field error
        const msg =
          data.username?.[0] ||
          data.email?.[0] ||
          data.password?.[0] ||
          data.detail ||
          data.non_field_errors?.[0] ||
          "Registration failed. Please try again.";
        setError(msg);
        return;
      }

      setSuccess("Account created! Redirecting to sign in…");
      setTimeout(() => router.push("/login"), 1800);

    } catch (err) {
      setError("Unable to reach the server. Please try again.");
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
          filter: "brightness(0.40) saturate(0.80)", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg,rgba(5,42,24,0.55) 0%,rgba(10,60,30,0.38) 100%)",
          zIndex: 1,
        }} />

        {/* Card */}
        <div className="card-in" style={{
          position: "relative", zIndex: 2,
          width: "100%", maxWidth: 620,
          background: "rgba(240,248,242,0.92)",
          backdropFilter: "blur(24px) saturate(1.8)",
          borderRadius: 24, padding: "44px 40px 36px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.20)",
        }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 26 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#0f9d58,#0a7d44)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 4px 12px rgba(15,157,88,0.35)" }}>🌱</div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#0a4d2e", letterSpacing: "-0.4px", fontFamily: "'Poppins',sans-serif" }}>EcoTrace</span>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", marginBottom: 5, fontFamily: "'Poppins',sans-serif" }}>Create your account</h1>
          <p style={{ fontSize: 13.5, color: "#6b7280", marginBottom: 28, lineHeight: 1.6, fontFamily: "'Poppins',sans-serif" }}>Choose your account type and fill in the details.</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Account Type */}
            <div>
              <label className="lbl">Account Type</label>
              <AccountTypeSelect
                value={form.accountType}
                onChange={v => setForm(f => ({ ...f, accountType: v }))}
              />
            </div>

            {/* Username + Email */}
            <div className="two-col">
              <div>
                <label className="lbl">Username</label>
                <input className="inp" type="text" placeholder="Choose a username"
                  value={form.username} onChange={set("username")} autoComplete="username" />
              </div>
              <div>
                <label className="lbl">Email</label>
                <input className="inp" type="email" placeholder="Enter your email"
                  value={form.email} onChange={set("email")} autoComplete="email" />
              </div>
            </div>

            {/* Password + Confirm */}
            <div className="two-col">
              <div>
                <label className="lbl">Password</label>
                <div className="inp-wrap">
                  <input className="inp" type={showPw ? "text" : "password"}
                    placeholder="Min. 8 characters" style={{ paddingRight: 44 }}
                    value={form.password} onChange={set("password")} autoComplete="new-password" />
                  <button type="button" className="eye-btn" onClick={() => setShowPw(p => !p)}>
                    <EyeIcon open={showPw} />
                  </button>
                </div>
              </div>
              <div>
                <label className="lbl">Confirm password</label>
                <div className="inp-wrap">
                  <input className="inp" type={showCPw ? "text" : "password"}
                    placeholder="Re-enter password" style={{ paddingRight: 44 }}
                    value={form.confirmPassword} onChange={set("confirmPassword")} autoComplete="new-password" />
                  <button type="button" className="eye-btn" onClick={() => setShowCPw(p => !p)}>
                    <EyeIcon open={showCPw} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tree Worker notice */}
            {form.accountType === "worker" && (
              <div style={{
                background: "rgba(15,157,88,0.10)", border: "1px solid rgba(15,157,88,0.25)",
                borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#0a5c38", lineHeight: 1.65,
                fontFamily: "'Poppins',sans-serif",
              }}>
                📸 <strong>Tree Worker account</strong> — you'll be able to upload growth photos and status updates for trees assigned to you.
              </div>
            )}

            {/* Error / Success */}
            {error   && <div className="err-box">{error}</div>}
            {success && <div className="ok-box">✓ {success}</div>}

            {/* Submit */}
            <button className="btn-main" type="submit" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13.5, color: "#6b7280", marginTop: 22, fontFamily: "'Poppins',sans-serif" }}>
            Already have an account?{" "}
            <a className="link-green" onClick={() => router.push("/login")}>Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}