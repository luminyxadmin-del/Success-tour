import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Destination } from "@/types";
import { getDestinationHero } from "@/data/destinationImages";

export default function DestinationCard({ destination, large }: { destination: Destination; large?: boolean }) {
  const heroImage = getDestinationHero(destination.slug, destination.image);
  return (
    <Link to={`/destinations/${destination.slug}`}
      className={`group relative block h-full overflow-hidden rounded-lg shadow-soft ${large ? "aspect-[4/5]" : ""}`}>
      <img src={heroImage} alt={destination.name} loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
          <MapPin className="h-3 w-3" />{destination.region}
        </span>
        <h3 className="mt-1 font-display text-2xl font-bold text-white">{destination.name}</h3>
        <p className="mt-1 line-clamp-2 max-w-sm text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {destination.tagline}
        </p>
      </div>
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-accent group-hover:text-primary">
        <ArrowUpRight className="h-5 w-5" />
      </div>
    </Link>
  );
}
