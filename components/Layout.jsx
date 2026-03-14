"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* ── Toast ── */
function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        background: "linear-gradient(135deg,#0a4d2e,#0f7a44)",
        color: "#fff",
        padding: "14px 24px",
        borderRadius: 16,
        fontFamily: "'Poppins',sans-serif",
        fontWeight: 600,
        fontSize: 14,
        boxShadow: "0 10px 44px rgba(10,77,46,0.42)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "fadeUp 0.38s cubic-bezier(.22,1,.36,1) both",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#4ade80",
          flexShrink: 0,
        }}
      />
      {msg}
    </div>
  );
}

/**
 * Layout — wrap every page with this.
 *
 * Usage:
 *   <Layout>
 *     <YourPageContent />
 *   </Layout>
 *
 * To show a toast from a child page, pass `showToast` down via props or context:
 *   const { showToast } = useLayout();   ← if you add context later
 *
 * For cart + login, lift state here so Navbar stays in sync across pages.
 */
export default function Layout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState(null);

  /**
   * Call this from any child page to add to cart and show a toast.
   * Pass it down as a prop:  <TreesSection onAdd={addToCart} />
   */
  const addToCart = (tree) => {
    setCart((c) => c + 1);
    setToast(`${tree.name} added to cart 🌱`);
    setTimeout(() => setToast(null), 2800);
  };

  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        cart={cart}
        onLogin={() => setLoggedIn((l) => !l)}
      />

      {/*
        Pass addToCart to children so any page can trigger cart updates.
        Pattern: React.cloneElement or just pass as a render prop.
        Simplest approach → pass as a function child:
          <Layout>{(addToCart) => <HomePage onAdd={addToCart} />}</Layout>
      */}
      <main style={{ paddingTop: 0 }}>
        {typeof children === "function" ? children({ addToCart }) : children}
      </main>

      <Footer />
      <Toast msg={toast} />
    </>
  );
}