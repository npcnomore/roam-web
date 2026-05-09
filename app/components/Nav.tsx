"use client";

import { useEffect, useState } from "react";
import RoamMark from "./RoamMark";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#" className="nav-brand">
          <RoamMark size={28} />
          <span>ROAM</span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-ctas">
          <a href="#download" className="btn btn-primary btn-sm">Get the app</a>
        </div>
      </div>
    </nav>
  );
}
