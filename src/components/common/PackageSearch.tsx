import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Tag, Search } from "lucide-react";
import { destinations } from "@/data/destinations";
import type { TripType } from "@/types";

// Keeps the dropdown in sync with the mega-menu — Tsavo is intentionally excluded
const STANDARD_SLUGS = [
  "maasai-mara",
  "amboseli",
  "nairobi",
  "lake-nakuru",
  "samburu",
  "lake-naivasha",
];

// Signature-only conservancies — selecting these routes to /signature, not /packages
const SIGNATURE_SLUGS = new Set([
  "olare-motorogi",
  "mara-naboisho",
  "selenkay-amboseli",
  "ol-pejeta-laikipia",
]);

const tripTypes: TripType[] = ["Safari", "Beach", "Adventure", "Family", "Honeymoon", "Cultural", "Luxury"];

/** Hero search bar — composes query params and routes to /packages or /signature. */
export default function PackageSearch() {
  const navigate = useNavigate();
  const [destSlug, setDestSlug] = useState("");
  const [experience, setExperience] = useState("");

  const standardDests = destinations.filter((d) => STANDARD_SLUGS.includes(d.slug));
  const signatureDests = destinations.filter((d) => SIGNATURE_SLUGS.has(d.slug));

  const submit = () => {
    // Conservancy destinations belong to the Signature Collection only
    if (SIGNATURE_SLUGS.has(destSlug)) {
      navigate("/signature");
      return;
    }
    const params = new URLSearchParams();
    if (destSlug) params.set("destination", destSlug);
    if (experience) params.set("experience", experience.toLowerCase());
    navigate(`/packages${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="rounded-xl border border-white/15 bg-white/95 p-3 shadow-lift backdrop-blur sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="flex items-center gap-2 rounded-lg border border-sand-300 bg-white px-3 py-2.5">
          <MapPin className="h-4 w-4 shrink-0 text-secondary" />
          <select
            value={destSlug}
            onChange={(e) => setDestSlug(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none"
            aria-label="Destination"
          >
            <option value="">Any destination</option>
            <optgroup label="Destinations">
              {standardDests.map((d) => (
                <option key={d.id} value={d.slug}>{d.name}</option>
              ))}
            </optgroup>
            <optgroup label="Signature Conservancies">
              {signatureDests.map((d) => (
                <option key={d.id} value={d.slug}>{d.name}</option>
              ))}
            </optgroup>
          </select>
        </label>

        <label className="flex items-center gap-2 rounded-lg border border-sand-300 bg-white px-3 py-2.5">
          <Tag className="h-4 w-4 shrink-0 text-secondary" />
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none"
            aria-label="Trip type"
          >
            <option value="">Any experience</option>
            {tripTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <button
          onClick={submit}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-accent-light"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </div>
    </div>
  );
}
