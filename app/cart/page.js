
"use client";

import React, { useState, useEffect } from "react";
import { API } from "../../lib/api";

// ── icons ──────────────────────────────────────────────────────────────────
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
    <circle cx={9} cy={21} r={1} /><circle cx={20} cy={21} r={1} />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const GiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <polyline points="20 12 20 22 4 22 4 12" /><rect x={2} y={7} width={20} height={5} />
    <line x1={12} y1={22} x2={12} y2={7} />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);
const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={48} height={48}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ── seed data ──────────────────────────────────────────────────────────────
const SEED_ITEMS = [
  {
    id: 1,
    name: "Papaya Tree",
    price: 499,
    qty: 1,
    oxygen: "30 kg/year oxygen",
    img: "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=200&q=80",
  },
];

// ── CSS ─────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600&display=swap');

  .cart-root {
    min-height: 100vh;
    background: linear-gradient(145deg, #e8f5e9 0%, #f0fdf4 40%, #dcfce7 100%);
    font-family: 'DM Sans', sans-serif;
    display: flex; align-items: flex-start; justify-content: center;
    padding: 48px 20px; box-sizing: border-box;
  }

  .empty-card {
    background: #fff; border-radius: 20px;
    box-shadow: 0 8px 40px rgba(22,163,74,0.10), 0 2px 8px rgba(0,0,0,0.04);
    padding: 52px 56px 48px; text-align: center;
    max-width: 380px; width: 100%;
    animation: fadeUp 0.5s cubic-bezier(.22,.68,0,1.2) both;
  }
  .empty-icon-wrap {
    width: 80px; height: 80px; border-radius: 50%; background: #dcfce7;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px; color: #16a34a;
  }
  .empty-title { font-family:'Playfair Display',serif; font-size:1.55rem; font-weight:600; color:#1a2e1a; margin:0 0 10px; }
  .empty-sub { color:#6b7280; font-size:0.92rem; line-height:1.55; margin:0 0 36px; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: #fff; font-family:'DM Sans',sans-serif; font-size:0.95rem; font-weight:600;
    border: none; border-radius: 50px; padding: 14px 32px; cursor: pointer;
    box-shadow: 0 4px 18px rgba(22,163,74,0.35); transition: transform 0.18s, box-shadow 0.18s;
  }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(22,163,74,0.40); }

  .cart-layout {
    display: grid; grid-template-columns: 1fr 340px; gap: 28px;
    width: 100%; max-width: 1100px;
    animation: fadeUp 0.45s cubic-bezier(.22,.68,0,1.2) both;
  }
  @media (max-width: 820px) { .cart-layout { grid-template-columns: 1fr; } }

  .card {
    background: #fff; border-radius: 16px;
    box-shadow: 0 4px 24px rgba(22,163,74,0.08), 0 1px 4px rgba(0,0,0,0.04);
    overflow: hidden;
  }
  .card-header {
    padding: 20px 24px; border-bottom: 1px solid #f3f4f6;
    font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:600; color:#1a2e1a;
  }
  .count-badge {
    display:inline-flex; align-items:center; justify-content:center;
    background:#dcfce7; color:#16a34a; font-family:'DM Sans',sans-serif;
    font-size:0.78rem; font-weight:600; border-radius:50px; padding:2px 10px; margin-left:8px;
  }

  .item-row {
    display:flex; align-items:center; gap:16px;
    padding:20px 24px; border-bottom:1px solid #f9fafb; transition:background 0.15s;
  }
  .item-row:last-child { border-bottom:none; }
  .item-row:hover { background:#f0fdf4; }
  .item-img { width:72px; height:72px; border-radius:12px; object-fit:cover; flex-shrink:0; box-shadow:0 2px 8px rgba(0,0,0,0.10); }
  .item-info { flex:1; min-width:0; }
  .item-name { font-weight:600; color:#1a2e1a; font-size:0.97rem; margin:0 0 4px; }
  .item-price-row { display:flex; align-items:center; gap:8px; }
  .item-price { color:#1a2e1a; font-weight:500; font-size:0.9rem; }
  .oxygen-badge { display:inline-flex; align-items:center; background:#dcfce7; color:#15803d; font-size:0.72rem; font-weight:600; padding:2px 9px; border-radius:50px; }
  .qty-ctrl { display:flex; align-items:center; border:1.5px solid #e5e7eb; border-radius:50px; overflow:hidden; }
  .qty-btn { width:32px; height:32px; border:none; background:transparent; color:#374151; font-size:1.1rem; font-weight:500; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.15s,color 0.15s; }
  .qty-btn:hover { background:#f0fdf4; color:#16a34a; }
  .qty-val { min-width:28px; text-align:center; font-weight:600; font-size:0.9rem; color:#1a2e1a; }
  .item-total { font-weight:600; font-size:0.95rem; color:#1a2e1a; margin:0 16px; }
  .remove-btn { background:none; border:none; color:#ef4444; cursor:pointer; font-size:0.78rem; font-weight:500; display:flex; align-items:center; gap:4px; padding:4px 6px; border-radius:6px; transition:background 0.15s; }
  .remove-btn:hover { background:#fef2f2; }

  .gift-btn {
    display:flex; align-items:center; justify-content:center; gap:8px;
    width:calc(100% - 48px); margin:0 24px 24px;
    background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%);
    color:#fff; font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:600;
    border:none; border-radius:12px; padding:14px; cursor:pointer;
    box-shadow:0 4px 14px rgba(22,163,74,0.28); transition:transform 0.15s,box-shadow 0.15s;
  }
  .gift-btn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(22,163,74,0.35); }

  .summary-card { padding:24px; }
  .summary-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:600; color:#1a2e1a; display:flex; align-items:center; gap:10px; margin-bottom:20px; }
  .coupon-row { display:flex; gap:8px; margin-bottom:8px; }
  .coupon-input { flex:1; border:1.5px solid #e5e7eb; border-radius:10px; padding:10px 14px; font-family:'DM Sans',sans-serif; font-size:0.88rem; color:#374151; outline:none; transition:border-color 0.2s; }
  .coupon-input:focus { border-color:#22c55e; }
  .apply-btn { background:#6b7280; color:#fff; border:none; border-radius:10px; padding:10px 18px; font-family:'DM Sans',sans-serif; font-size:0.85rem; font-weight:600; cursor:pointer; transition:background 0.15s; }
  .apply-btn:hover { background:#4b5563; }
  .summary-divider { border:none; border-top:1px solid #f3f4f6; margin:12px 0; }
  .summary-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
  .summary-label { color:#6b7280; font-size:0.9rem; }
  .summary-val { color:#1a2e1a; font-size:0.9rem; font-weight:500; }
  .total-row { display:flex; justify-content:space-between; align-items:center; margin:14px 0 20px; }
  .total-label { font-weight:700; font-size:1rem; color:#1a2e1a; }
  .total-val { font-weight:700; font-size:1.1rem; color:#16a34a; }

  .place-btn {
    width:100%; background:linear-gradient(135deg,#22c55e 0%,#16a34a 100%);
    color:#fff; border:none; border-radius:12px; padding:15px;
    font-family:'DM Sans',sans-serif; font-size:0.95rem; font-weight:700; cursor:pointer;
    box-shadow:0 4px 16px rgba(22,163,74,0.30); transition:transform 0.15s,box-shadow 0.15s,opacity 0.15s;
    margin-bottom:10px; display:flex; align-items:center; justify-content:center; gap:10px;
  }
  .place-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 22px rgba(22,163,74,0.38); }
  .place-btn:disabled { opacity:0.65; cursor:not-allowed; }

  .continue-btn {
    width:100%; background:#f3f4f6; color:#374151; border:none; border-radius:12px;
    padding:14px; font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:600;
    cursor:pointer; transition:background 0.15s;
  }
  .continue-btn:hover { background:#e5e7eb; }

  /* ── Payment loading overlay ── */
  .pay-overlay {
    position:fixed; inset:0; background:rgba(5,42,24,0.65);
    display:flex; align-items:center; justify-content:center;
    z-index:999; backdrop-filter:blur(4px);
  }
  .pay-spinner {
    background:#fff; border-radius:20px; padding:40px 48px;
    text-align:center; max-width:320px; width:90%;
    box-shadow:0 24px 64px rgba(0,0,0,0.25);
  }
  .spinner-ring {
    width:48px; height:48px; border:4px solid #dcfce7;
    border-top-color:#16a34a; border-radius:50%;
    animation:spin 0.75s linear infinite; margin:0 auto 20px;
  }
  @keyframes spin { to { transform:rotate(360deg); } }

  /* ── Success state ── */
  .success-card {
    background:#fff; border-radius:20px;
    box-shadow:0 8px 40px rgba(22,163,74,0.12);
    padding:52px 48px; text-align:center; max-width:400px; width:100%;
    animation:fadeUp 0.5s cubic-bezier(.22,.68,0,1.2) both;
  }
  .success-icon { color:#16a34a; margin-bottom:20px; }
  .success-title { font-family:'Playfair Display',serif; font-size:1.6rem; color:#1a2e1a; margin:0 0 10px; }
  .success-sub { color:#6b7280; font-size:0.92rem; line-height:1.65; margin:0 0 10px; }
  .pid-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:10px 16px; font-size:0.82rem; color:#166534; font-family:monospace; margin:16px 0 28px; word-break:break-all; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .item-enter { animation:fadeUp 0.3s cubic-bezier(.22,.68,0,1.2) both; }
`;

// ── Load Razorpay script dynamically ──────────────────────────────────────
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function Cart() {
  const [items, setItems]               = useState(SEED_ITEMS);
  const [coupon, setCoupon]             = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError]   = useState("");
  const [paying, setPaying]             = useState(false);   // overlay
  const [payStatus, setPayStatus]       = useState(null);    // null | "success" | "failed"
  const [paymentId, setPaymentId]       = useState("");

  const isEmpty = items.length === 0;

  const changeQty = (id, delta) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
          .filter(i => i.qty > 0)
    );
  };
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total    = subtotal - discount;

  const applyCode = () => {
    if (coupon.trim().toUpperCase() === "TREE10") {
      setCouponApplied(true); setCouponError("");
    } else {
      setCouponError("Invalid coupon code"); setCouponApplied(false);
    }
  };

  // ── RAZORPAY CHECKOUT ────────────────────────────────────────────────────
  const handleCheckout = async () => {

    setPaying(true);
  
    try {
  
      const res = await fetch("http://127.0.0.1:8000/api/create-payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total
        }),
      });
  
      const data = await res.json();
  
      setPaymentId(data.payment_id);
      setPayStatus("success");
      setItems([]);
  
    } catch (err) {
  
      console.error(err);
      setPayStatus("failed");
  
    } finally {
  
      setPaying(false);
  
    }
  };

  // ── SUCCESS STATE ─────────────────────────────────────────────────────────
  if (payStatus === "success") {
    return (
      <>
        <style>{css}</style>
        <div className="cart-root">
          <div className="success-card">
            <div className="success-icon"><CheckIcon /></div>
            <h2 className="success-title">Payment Successful! 🌱</h2>
            <p className="success-sub">Your trees have been adopted. You'll receive a GPS tracking link and monthly updates.</p>
            <div className="pid-box">Payment ID: {paymentId}</div>
            <button className="btn-primary" onClick={() => window.location.href = "/dashboard"}>
              View My Trees <ArrowRight />
            </button>
          </div>
        </div>
      </>
    );
  }

  // ── FAILED STATE ──────────────────────────────────────────────────────────
  if (payStatus === "failed") {
    return (
      <>
        <style>{css}</style>
        <div className="cart-root">
          <div className="success-card">
            <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
            <h2 className="success-title">Payment Failed</h2>
            <p className="success-sub">Something went wrong with your payment. Your cart is still saved.</p>
            <button className="btn-primary" onClick={() => setPayStatus(null)}>
              Try Again <ArrowRight />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      {/* ── Loading overlay while Razorpay initialises ── */}
      {paying && (
        <div className="pay-overlay">
          <div className="pay-spinner">
            <div className="spinner-ring" />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1a2e1a", marginBottom: 6 }}>
              Opening Payment Gateway
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#6b7280" }}>
              Please wait…
            </div>
          </div>
        </div>
      )}

      <div className="cart-root">
        {isEmpty ? (
          /* ── EMPTY STATE ── */
          <div className="empty-card">
            <div className="empty-icon-wrap"><CartIcon /></div>
            <h2 className="empty-title">Your cart is empty</h2>
            <p className="empty-sub">Start adding trees to your cart and make a difference!</p>
            <button className="btn-primary" onClick={() => window.history.back()}>
              Browse Trees <ArrowRight />
            </button>
          </div>
        ) : (
          /* ── FILLED STATE ── */
          <div className="cart-layout">

            {/* LEFT: items list */}
            <div>
              <div className="card">
                <div className="card-header">
                  Cart Items
                  <span className="count-badge">{items.reduce((s, i) => s + i.qty, 0)}</span>
                </div>

                {items.map(item => (
                  <div key={item.id} className="item-row item-enter">
                    <img src={item.img} alt={item.name} className="item-img"
                      onError={e => { e.target.src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=80"; }} />
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <div className="item-price-row">
                        <span className="item-price">₹{item.price}</span>
                        <span className="oxygen-badge">{item.oxygen}</span>
                      </div>
                    </div>
                    <div className="qty-ctrl">
                      <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => changeQty(item.id, +1)}>+</button>
                    </div>
                    <span className="item-total">₹{item.price * item.qty}</span>
                    <button className="remove-btn" onClick={() => remove(item.id)}>
                      <TrashIcon /> Remove
                    </button>
                  </div>
                ))}

                <button className="gift-btn">
                  <GiftIcon /> Send as a Gift
                </button>
              </div>
            </div>

            {/* RIGHT: order summary */}
            <div className="card summary-card">
              <div className="summary-title">
                <span style={{ color: "#16a34a" }}><ClipboardIcon /></span>
                Order Summary
              </div>

              {/* Coupon */}
              <div className="coupon-row">
                <input
                  className="coupon-input"
                  placeholder='Try "TREE10"'
                  value={coupon}
                  onChange={e => { setCoupon(e.target.value); setCouponError(""); }}
                  onKeyDown={e => e.key === "Enter" && applyCode()}
                />
                <button className="apply-btn" onClick={applyCode}>Apply</button>
              </div>
              {couponError   && <p style={{ color:"#ef4444", fontSize:"0.8rem", marginBottom:12 }}>{couponError}</p>}
              {couponApplied && <p style={{ color:"#16a34a", fontSize:"0.8rem", marginBottom:12 }}>✓ 10% discount applied!</p>}

              {/* Line items */}
              <div className="summary-row">
                <span className="summary-label">Subtotal ({items.reduce((s,i)=>s+i.qty,0)} trees)</span>
                <span className="summary-val">₹{subtotal}</span>
              </div>
              {couponApplied && (
                <div className="summary-row">
                  <span className="summary-label" style={{ color:"#16a34a" }}>Discount (TREE10)</span>
                  <span className="summary-val" style={{ color:"#16a34a" }}>−₹{discount}</span>
                </div>
              )}
              <div className="summary-row">
                <span className="summary-label">Planting & GPS Tracking</span>
                <span className="summary-val" style={{ color:"#16a34a" }}>Included ✓</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Monthly Photo Updates</span>
                <span className="summary-val" style={{ color:"#16a34a" }}>Included ✓</span>
              </div>
              <hr className="summary-divider" />
              <div className="total-row">
                <span className="total-label">Total</span>
                <span className="total-val">₹{total}</span>
              </div>

              {/* Checkout button */}
              <button
                className="place-btn"
                onClick={handleCheckout}
                disabled={paying}
              >
                {paying ? (
                  <>
                    <div style={{ width:18,height:18,border:"3px solid rgba(255,255,255,0.35)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.75s linear infinite" }}/>
                    Processing…
                  </>
                ) : (
                  <>🔒 Pay ₹{total} Securely</>
                )}
              </button>
              <button className="continue-btn" onClick={() => window.history.back()}>
                Continue Adopting
              </button>

              {/* Trust badges */}
              <div style={{ marginTop:16, display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
                {["🔐 SSL Secure", "🏦 Razorpay", "✅ Verified"].map(b => (
                  <span key={b} style={{ fontSize:"0.72rem", color:"#6b7280", background:"#f9fafb", padding:"3px 10px", borderRadius:"50px", border:"1px solid #e5e7eb" }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}