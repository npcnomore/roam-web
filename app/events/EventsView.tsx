"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { createClient } from "../lib/supabase/client";
import {
  type EventRow,
  CATEGORIES,
  REGIONS,
  categoryLabel,
  regionLabel,
} from "../lib/events";
import EventCard from "./EventCard";
import AuthDialog from "./AuthDialog";
import CreateEventDialog from "./CreateEventDialog";

type Props = { initialEvents: EventRow[] };

export default function EventsView({ initialEvents }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const [events, setEvents] = useState<EventRow[]>(initialEvents);
  const [region, setRegion] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [session, setSession] = useState<Session | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (region !== "all" && e.region !== region) return false;
      if (category !== "all" && e.category !== category) return false;
      return true;
    });
  }, [events, region, category]);

  const refetch = async () => {
    const { data } = await supabase
      .from("events")
      .select(
        "id, title, description, category, cover_image_url, starts_at, ends_at, is_recurring, timezone, region, city, venue_name, address, is_free, price_text, source, source_url",
      )
      .eq("status", "active")
      .eq("visibility", "public")
      .gte("starts_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order("starts_at", { ascending: true })
      .limit(200);
    if (data) setEvents(data as EventRow[]);
  };

  const onCreateClick = () => {
    if (session) setCreateOpen(true);
    else setAuthOpen(true);
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <Nav />
      <main className="events-page">
        <div className="container">
          <header className="events-header">
            <span className="section-eyebrow">Events</span>
            <h1 className="events-title">
              Find the meet. <span className="grad-text">Start a convoy.</span>
            </h1>
            <p className="events-sub">
              Cars &amp; Coffee, car shows, track days, and cruise nights — every week,
              every region. Filter by your area, then tap one event to start a convoy.
            </p>
          </header>

          <div className="events-toolbar">
            <div className="events-filters">
              <label className="filter-group">
                <span className="filter-label">Region</span>
                <select
                  className="filter-select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="all">All regions</option>
                  {REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="filter-group">
                <span className="filter-label">Category</span>
                <select
                  className="filter-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.emoji} {c.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="events-actions">
              {session ? (
                <>
                  <span className="events-user">
                    {session.user.email}
                  </span>
                  <button className="btn btn-ghost btn-sm" onClick={onSignOut}>
                    Sign out
                  </button>
                </>
              ) : null}
              <button className="btn btn-primary btn-sm" onClick={onCreateClick}>
                + Create event
              </button>
            </div>
          </div>

          <div className="events-meta">
            Showing {filtered.length} of {events.length} upcoming event
            {events.length === 1 ? "" : "s"}
            {region !== "all" ? ` in ${regionLabel(region)}` : ""}
            {category !== "all" ? ` · ${categoryLabel(category)}` : ""}
          </div>

          {filtered.length === 0 ? (
            <div className="events-empty">
              <div className="events-empty-emoji">🛞</div>
              <div className="events-empty-title">No events match those filters yet.</div>
              <div className="events-empty-sub">
                Try a different region or category — or be the first to post one.
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: 18 }}
                onClick={onCreateClick}
              >
                Create the first event
              </button>
            </div>
          ) : (
            <div className="events-grid">
              {filtered.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <AuthDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        supabase={supabase}
      />
      <CreateEventDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        supabase={supabase}
        session={session}
        onCreated={async () => {
          setCreateOpen(false);
          await refetch();
        }}
      />
    </>
  );
}
