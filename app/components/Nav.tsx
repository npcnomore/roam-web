"use client";

import { useEffect, useState } from "react";
import RoamMark from "./RoamMark";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open so the page underneath
  // doesn't scroll when users swipe inside the menu.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <button
            type="button"
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <a href="/" className="nav-brand">
            <RoamMark size={28} />
            <span>ROAM</span>
          </a>
          <div className="nav-links">
            <a href="/events">Events</a>
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div className="nav-ctas">
            <a href="/#download" className="btn btn-primary btn-sm">Get the app</a>
          </div>
        </div>
      </nav>

      <div
        id="mobile-nav-menu"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-backdrop" onClick={close} />
        <aside
          className="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="mobile-menu-head">
            <a href="/" className="nav-brand" onClick={close}>
              <RoamMark size={26} />
              <span>ROAM</span>
            </a>
            <button
              type="button"
              className="mobile-menu-close"
              onClick={close}
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <div className="mobile-menu-section">
              <a href="/events" className="mobile-menu-link" onClick={close}>Events</a>
              <a href="/#features" className="mobile-menu-link" onClick={close}>Features</a>
              <a href="/#pricing" className="mobile-menu-link" onClick={close}>Pricing</a>
              <a href="/#faq" className="mobile-menu-link" onClick={close}>FAQ</a>
            </div>
            <div className="mobile-menu-section">
              <div className="mobile-menu-h">Company</div>
              <a href="#" className="mobile-menu-link sub" onClick={close}>About</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Press</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Careers</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Blog</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Contact</a>
            </div>
            <div className="mobile-menu-section">
              <div className="mobile-menu-h">Legal</div>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Privacy</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Terms</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Security</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>DMCA</a>
              <a href="#" className="mobile-menu-link sub" onClick={close}>Acceptable use</a>
            </div>
          </nav>
          <div className="mobile-menu-foot">
            <a href="/#download" className="btn btn-primary" onClick={close}>
              Get the app
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
