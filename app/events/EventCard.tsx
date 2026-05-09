import {
  type EventRow,
  categoryEmoji,
  categoryLabel,
  regionLabel,
} from "../lib/events";

function formatStartsAt(starts_at: string, timezone: string) {
  try {
    const d = new Date(starts_at);
    const date = d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: timezone || undefined,
    });
    const time = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone || undefined,
    });
    return `${date} · ${time}`;
  } catch {
    return new Date(starts_at).toLocaleString();
  }
}

export default function EventCard({ event }: { event: EventRow }) {
  const venue = [event.venue_name, event.city].filter(Boolean).join(", ");
  const region = regionLabel(event.region);
  return (
    <article className="event-list-card">
      <div className="event-list-icon">{categoryEmoji(event.category)}</div>
      <div className="event-list-body">
        <div className="event-list-title">{event.title}</div>
        <div className="event-list-meta">
          {formatStartsAt(event.starts_at, event.timezone)}
          {venue ? ` · ${venue}` : ""}
        </div>
        {event.description ? (
          <div className="event-list-desc">{event.description}</div>
        ) : null}
        <div className="event-list-tags">
          <span className="event-list-tag cat">
            {categoryEmoji(event.category)} {categoryLabel(event.category)}
          </span>
          {region ? (
            <span className="event-list-tag region">{region}</span>
          ) : null}
          {event.is_recurring ? (
            <span className="event-list-tag recurring">↻ Recurring</span>
          ) : null}
          {event.is_free ? (
            <span className="event-list-tag free">Free</span>
          ) : event.price_text ? (
            <span className="event-list-tag price">{event.price_text}</span>
          ) : null}
        </div>
      </div>
      {event.source_url ? (
        <a
          href={event.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm event-list-cta"
        >
          Details ↗
        </a>
      ) : null}
    </article>
  );
}
