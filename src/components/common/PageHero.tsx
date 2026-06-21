import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

interface Crumb { label: string; to?: string }

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs?: Crumb[];
  size?: "md" | "lg";
}

export default function PageHero({ eyebrow, title, subtitle, image, breadcrumbs, size = "md" }: Props) {
  return (
    <section className={`relative flex items-end overflow-hidden ${size === "lg" ? "min-h-[70vh]" : "min-h-[52vh]"}`}>
      <div className="absolute inset-0">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-primary/25" />
      </div>
      <Container className="relative z-10 pb-14 pt-32">
        {breadcrumbs && (
          <nav className="mb-5 flex flex-wrap items-center gap-1 text-xs font-medium text-white/70">
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.to ? (
                  <Link to={c.to} className="transition hover:text-accent">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
