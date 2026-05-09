"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };

const items: FAQItem[] = [
  {
    q: "Is Roam really free?",
    a: "Yes. The Free tier includes the convoy map, push-to-talk, navigation, alerts, trip recording, share cards, CarPlay, and all 15 achievements. We make money from Roam+ subscribers, not ads, not data.",
  },
  {
    q: "Does PTT work in CarPlay?",
    a: "Fully. Tap-to-toggle Talk on the head unit (CarPlay doesn't allow long-press). Audio routes through your car speakers and a 'Maya · talking' banner shows you who's on the air. iOS and Android Auto both supported.",
  },
  {
    q: "How much battery does it use?",
    a: "About 6–9% per hour with screen-on driving — comparable to Waze or Google Maps. Background updates use ~1% per hour. We've spent a lot of time in Instruments.",
  },
  {
    q: "What about privacy?",
    a: "Location is shared only with crew members you've invited, only during an active convoy. PTT audio is end-to-end encrypted. Trip data stays on your device unless you explicitly share. We never sell or broker location data.",
  },
  {
    q: "Can I use Roam without a crew?",
    a: "Yes — Roam works as a stand-alone navigation app with trip recording and achievements. Most people start solo and add friends after their first drive.",
  },
  {
    q: "Will it drain my data?",
    a: "About 30 MB/hr in active convoy with PTT. Maps cache aggressively so a repeated route uses ~10 MB/hr. You can set the app to download tiles on Wi-Fi only.",
  },
  {
    q: "What car does it support?",
    a: "Every car. Roam runs on your phone. CarPlay (iPhone) and Android Auto support is built in. No OBD-II adapter, no head unit modifications, no nonsense.",
  },
  {
    q: "Can I cancel Roam+?",
    a: "Anytime, from the App Store or Play Store. You'll keep your features through the end of the billing period and drop back to Free, with all your trip history intact.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="section" id="faq">
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{ textAlign: "center" }} className="reveal">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">
            Questions, <span className="grad-text">answered.</span>
          </h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? "open" : ""} reveal`}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{it.q}</span>
                  <span className="faq-chev">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 5 L 7 9 L 11 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{it.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
