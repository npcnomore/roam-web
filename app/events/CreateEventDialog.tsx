"use client";

import { useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { CATEGORIES, REGIONS } from "../lib/events";

type Props = {
  open: boolean;
  onClose: () => void;
  supabase: SupabaseClient;
  session: Session | null;
  onCreated: () => void | Promise<void>;
};

const TIMEZONE_BY_REGION: Record<string, string> = {
  bay_area: "America/Los_Angeles",
  la: "America/Los_Angeles",
  nyc: "America/New_York",
  miami: "America/New_York",
};

export default function CreateEventDialog({
  open,
  onClose,
  supabase,
  session,
  onCreated,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [region, setRegion] = useState(REGIONS[0].value);
  const [city, setCity] = useState("");
  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  const [startsAtLocal, setStartsAtLocal] = useState("");
  const [endsAtLocal, setEndsAtLocal] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isFree, setIsFree] = useState(true);
  const [priceText, setPriceText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setTitle("");
    setDescription("");
    setCategory(CATEGORIES[0].value);
    setRegion(REGIONS[0].value);
    setCity("");
    setVenueName("");
    setAddress("");
    setStartsAtLocal("");
    setEndsAtLocal("");
    setIsRecurring(false);
    setIsFree(true);
    setPriceText("");
    setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError("You must be signed in to create an event.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const startsAtIso = new Date(startsAtLocal).toISOString();
    const endsAtIso = endsAtLocal ? new Date(endsAtLocal).toISOString() : null;

    const { error: insertErr } = await supabase.from("events").insert({
      source: "user",
      title: title.trim(),
      description: description.trim() || null,
      category,
      region,
      city: city.trim() || null,
      venue_name: venueName.trim() || null,
      address: address.trim() || null,
      starts_at: startsAtIso,
      ends_at: endsAtIso,
      is_recurring: isRecurring,
      timezone: TIMEZONE_BY_REGION[region] ?? "America/Los_Angeles",
      is_free: isFree,
      price_text: !isFree && priceText.trim() ? priceText.trim() : null,
      visibility: "public",
      status: "active",
      created_by: session.user.id,
    });

    setSubmitting(false);

    if (insertErr) {
      setError(insertErr.message);
      return;
    }

    reset();
    await onCreated();
  };

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={handleClose}>
      <div
        className="dialog dialog-wide"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="dialog-close" onClick={handleClose} aria-label="Close">
          ×
        </button>
        <h2 className="dialog-title">Post an event</h2>
        <p className="dialog-sub">
          Cars &amp; Coffee, car show, track day, cruise night — wherever crews
          actually show up.
        </p>
        <form onSubmit={submit} className="dialog-form">
          <label className="form-field">
            <span className="form-label">Title</span>
            <input
              type="text"
              required
              maxLength={200}
              placeholder="Sunday Supercar Meet"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span className="form-label">Category</span>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.emoji} {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Region</span>
              <select
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="form-input"
              >
                {REGIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label className="form-field">
              <span className="form-label">Starts</span>
              <input
                type="datetime-local"
                required
                value={startsAtLocal}
                onChange={(e) => setStartsAtLocal(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Ends (optional)</span>
              <input
                type="datetime-local"
                value={endsAtLocal}
                onChange={(e) => setEndsAtLocal(e.target.value)}
                className="form-input"
              />
            </label>
          </div>

          <div className="form-row">
            <label className="form-field">
              <span className="form-label">City</span>
              <input
                type="text"
                placeholder="San Francisco"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input"
              />
            </label>
            <label className="form-field">
              <span className="form-label">Venue</span>
              <input
                type="text"
                placeholder="Cars & Coffee SF"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                className="form-input"
              />
            </label>
          </div>

          <label className="form-field">
            <span className="form-label">Address (optional)</span>
            <input
              type="text"
              placeholder="1 Marina Blvd, San Francisco, CA"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
            />
          </label>

          <label className="form-field">
            <span className="form-label">Description (optional)</span>
            <textarea
              rows={3}
              maxLength={1000}
              placeholder="Coffee, tunes, cars. Show up early, the good spots fill fast."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </label>

          <div className="form-row form-row-checks">
            <label className="form-check">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
              <span>Recurring weekly</span>
            </label>
            <label className="form-check">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
              <span>Free to attend</span>
            </label>
          </div>

          {!isFree ? (
            <label className="form-field">
              <span className="form-label">Price</span>
              <input
                type="text"
                placeholder="$25 spectator / $75 driver"
                value={priceText}
                onChange={(e) => setPriceText(e.target.value)}
                className="form-input"
              />
            </label>
          ) : null}

          {error ? <div className="form-error">{error}</div> : null}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || !title || !startsAtLocal}
            >
              {submitting ? "Publishing…" : "Publish event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
