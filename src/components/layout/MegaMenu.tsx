import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { destinations } from "@/data/destinations";
import { IMG } from "@/data/images";

const MENU_SLUGS = ["maasai-mara", "amboseli", "nairobi", "lake-naivasha", "lake-nakuru", "samburu"];

export default function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const menuDestinations = destinations.filter((d) => MENU_SLUGS.includes(d.slug));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 10, x: "-50%" }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 top-[72px] z-50 mt-3 w-[min(980px,92vw)] overflow-hidden rounded-lg border border-sand-200 bg-white shadow-lift"
    >
      <div className="grid grid-cols-1 md:grid-cols-6">
        <div className="col-span-4 p-6">
          <p className="eyebrow mb-4">Explore East Africa by region</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {menuDestinations.map((d) => (
              <Link key={d.id} to={`/destinations/${d.slug}`} onClick={onNavigate}
                className="group flex items-start gap-3 rounded p-2 transition hover:bg-sand-100">
                <img src={d.image} alt={d.name} className="h-12 w-12 shrink-0 rounded object-cover" loading="lazy" />
                <span>
                  <span className="block text-sm font-semibold text-primary group-hover:text-secondary">{d.name}</span>
                  <span className="block text-xs text-muted">{d.region}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-5">
            <Link to="/destinations" onClick={onNavigate}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-dark">
              View all destinations <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/signature" onClick={onNavigate}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:opacity-80">
              <Sparkles className="h-3.5 w-3.5" /> Signature Collection
            </Link>
          </div>
        </div>
        <Link to="/signature" onClick={onNavigate}
          className="group relative col-span-2 min-h-[220px] overflow-hidden">
          <img src={IMG.lion} alt="Signature Collection"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
          <div className="absolute bottom-0 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">Signature Collection</p>
            <p className="font-display text-xl font-bold text-white">Four Private Journeys</p>
            <p className="mt-1 text-xs text-white/80">Where the wild is yours alone</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
