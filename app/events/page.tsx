import { createClient } from "../lib/supabase/server";
import type { EventRow } from "../lib/events";
import EventsView from "./EventsView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events · Roam",
  description:
    "Cars & Coffee, car shows, track days, and cruise nights — every week, every region.",
};

export default async function EventsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, description, category, cover_image_url, starts_at, ends_at, is_recurring, timezone, region, city, venue_name, address, is_free, price_text, source, source_url",
    )
    .eq("status", "active")
    .eq("visibility", "public")
    .gte("starts_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .order("starts_at", { ascending: true })
    .limit(200);

  const initialEvents: EventRow[] = error || !data ? [] : (data as EventRow[]);

  return <EventsView initialEvents={initialEvents} />;
}
