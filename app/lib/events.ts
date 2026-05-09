export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  cover_image_url: string | null;
  starts_at: string;
  ends_at: string | null;
  is_recurring: boolean;
  timezone: string;
  region: string | null;
  city: string | null;
  venue_name: string | null;
  address: string | null;
  is_free: boolean;
  price_text: string | null;
  source: string;
  source_url: string | null;
};

export const CATEGORIES: Array<{ value: string; label: string; emoji: string }> = [
  { value: "cars_and_coffee", label: "Cars & Coffee", emoji: "☕" },
  { value: "car_show", label: "Car Show", emoji: "🏆" },
  { value: "track_day", label: "Track Day", emoji: "🏁" },
  { value: "cruise_night", label: "Cruise Night", emoji: "🌙" },
];

export const REGIONS: Array<{ value: string; label: string }> = [
  { value: "bay_area", label: "SF Bay Area" },
  { value: "la", label: "Greater LA" },
  { value: "nyc", label: "NY Metro" },
  { value: "miami", label: "Miami / S. Florida" },
];

export function categoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function categoryEmoji(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.emoji ?? "📍";
}

export function regionLabel(value: string | null) {
  if (!value) return null;
  return REGIONS.find((r) => r.value === value)?.label ?? value;
}
