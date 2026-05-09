import RoamMark from "./RoamMark";

/**
 * Social-icon glyphs. Filled with `currentColor` so they inherit the link's
 * `var(--text-dim)` and pick up `:hover` color shifts naturally. Sized 18px
 * to sit comfortably inside the 36×36 rounded-square chip.
 *
 * Hrefs are placeholder `#` for now — wire to real Roam handles whenever
 * those exist (the iOS app's About page just emails support@roam.app).
 */
const socials: Array<{ label: string; href: string; icon: React.ReactElement }> = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a2.997 2.997 0 0 0-2.107-2.117C19.495 3.5 12 3.5 12 3.5s-7.495 0-9.391.569A2.997 2.997 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.107 2.117C4.505 20.5 12 20.5 12 20.5s7.495 0 9.391-.569a2.997 2.997 0 0 0 2.107-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <RoamMark size={28} />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 19,
                  letterSpacing: "0.06em",
                  color: "#fff",
                }}
              >
                ROAM
              </span>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--text-dim)",
                marginTop: 14,
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              The convoy app for car people. Built by drivers, for drivers, in San Francisco.
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-dim)",
                    transition: "all 200ms",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-h">Product</div>
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#" className="footer-link">CarPlay & Android Auto</a>
            <a href="#" className="footer-link">Achievements</a>
            <a href="#" className="footer-link">Changelog</a>
          </div>
          <div>
            <div className="footer-h">Company</div>
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Press</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Blog</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          <div>
            <div className="footer-h">Legal</div>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Security</a>
            <a href="#" className="footer-link">DMCA</a>
            <a href="#" className="footer-link">Acceptable use</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Roam Mobility, Inc. All rights reserved. Made with 🛞 in San Francisco.</div>
          <div>
            v2.4 · Status: <span style={{ color: "#4ADE80" }}>● All systems go</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
