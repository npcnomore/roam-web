"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Wraps the page so that any descendant with `.reveal` fades + rises into view
 * on scroll. Mirrors the `useReveal` hook in the design handoff (`app.jsx`).
 *
 * Self-healing under React re-renders. The IntersectionObserver adds `.in`
 * via direct DOM mutation, but React-DOM compares the new className prop
 * against the live DOM attribute on every render — so the moment any
 * stateful sibling re-renders (FAQ click, alerts demo tick, customize drag),
 * React rewrites the className back to its JSX value and `.in` is gone.
 * Symptom: clicking an FAQ row faded every revealed FAQ row back to opacity:0.
 *
 * Fix: when IO fires for an element, also stamp it with `data-revealed`.
 * That attribute is invisible to React (not in JSX) so it survives every
 * re-render. A MutationObserver watches for class-attribute changes on any
 * `[data-revealed]` node and re-adds `.in` instantly — between React's
 * className write and the next paint, so there is no visible flicker.
 */
export default function RevealRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target instanceof HTMLElement) {
            e.target.classList.add("in");
            // Marker that survives React re-renders (React only manages props
            // declared in JSX). Used by the MutationObserver below to know
            // which nodes deserve a re-applied `.in`.
            e.target.dataset.revealed = "1";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (el.dataset.revealed === "1") {
          // Already crossed the threshold once. If React stripped `.in`
          // since, restore it. Idempotent if the class is already there.
          if (!el.classList.contains("in")) el.classList.add("in");
        } else {
          io.observe(el);
        }
      });
    };

    observeAll();

    // Watch the entire tree so:
    //  1. class changes on `[data-revealed]` nodes get `.in` restored
    //     (this is the FAQ-click bug fix).
    //  2. new `.reveal` nodes added later (HMR, conditional rendering)
    //     start being observed.
    const mo = new MutationObserver((mutations) => {
      let scanForNew = false;
      for (const m of mutations) {
        if (
          m.type === "attributes" &&
          m.attributeName === "class" &&
          m.target instanceof HTMLElement &&
          m.target.dataset.revealed === "1" &&
          !m.target.classList.contains("in")
        ) {
          m.target.classList.add("in");
        } else if (m.type === "childList" && m.addedNodes.length > 0) {
          scanForNew = true;
        }
      }
      if (scanForNew) observeAll();
    });

    mo.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
      childList: true,
      subtree: true,
    });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return <>{children}</>;
}
