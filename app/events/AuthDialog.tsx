"use client";

import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

type Props = {
  open: boolean;
  onClose: () => void;
  supabase: SupabaseClient;
};

export default function AuthDialog({ open, onClose, supabase }: Props) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=/events`
        : undefined;
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setSending(false);
    if (err) setError(err.message);
    else setSent(true);
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="dialog-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="dialog-title">Sign in to post an event</h2>
        <p className="dialog-sub">
          We&apos;ll email you a magic link — no passwords. Once you click it, you&apos;ll
          be back here ready to publish.
        </p>
        {sent ? (
          <div className="dialog-success">
            <div style={{ fontSize: 32, marginBottom: 8 }}>📬</div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>Check your inbox</div>
            <div style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 6 }}>
              We sent a sign-in link to <strong>{email}</strong>. Open it on this
              device to continue.
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="dialog-form">
            <label className="form-field">
              <span className="form-label">Email</span>
              <input
                type="email"
                required
                autoFocus
                placeholder="you@drivers.club"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </label>
            {error ? <div className="form-error">{error}</div> : null}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={sending || !email}
            >
              {sending ? "Sending…" : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
